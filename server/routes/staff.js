import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { User, Complaint, SupplySchedule, Zone, MeterReading, Bill } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// All routes require STAFF role
router.use(authenticate, authorize('STAFF', 'ADMIN'));

// Get staff dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get pending complaints
        const pendingComplaints = await Complaint.count({
            where: { status: { [Op.in]: ['Open', 'In Progress'] } }
        });

        // Get today's meter readings
        const todayReadings = await MeterReading.count({
            where: { readingDate: today }
        });

        // Get collection rate
        const totalBills = await Bill.count();
        const paidBills = await Bill.count({ where: { status: 'Paid' } });
        const collectionRate = totalBills > 0 ? ((paidBills / totalBills) * 100).toFixed(1) : 0;

        res.json({
            pendingComplaints,
            todayReadings,
            collectionRate,
            totalBills,
            paidBills
        });
    } catch (error) {
        console.error('Staff dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Get all supply schedules
router.get('/schedules', async (req, res) => {
    try {
        const schedules = await SupplySchedule.findAll({
            include: [{ model: Zone, as: 'zone' }],
            order: [['effectiveDate', 'DESC']]
        });

        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
});

// Update supply schedule
router.put('/schedules/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { morningSlot, eveningSlot, status, notes } = req.body;

        const schedule = await SupplySchedule.findByPk(id);

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        if (morningSlot) schedule.morningSlot = morningSlot;
        if (eveningSlot) schedule.eveningSlot = eveningSlot;
        if (status) schedule.status = status;
        if (notes !== undefined) schedule.notes = notes;

        await schedule.save();

        res.json(schedule);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update schedule' });
    }
});

// Get all complaints
router.get('/complaints', async (req, res) => {
    try {
        const { status } = req.query;

        const where = {};
        if (status) {
            where.status = status;
        }

        const complaints = await Complaint.findAll({
            where,
            include: [{ model: User, as: 'consumer', attributes: ['id', 'name', 'email', 'consumerId', 'address'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Update complaint status
router.put('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, resolution, priority } = req.body;

        const complaint = await Complaint.findByPk(id);

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        if (status) {
            complaint.status = status;
            if (status === 'Resolved') {
                complaint.resolvedDate = new Date();
            }
        }
        if (resolution) complaint.resolution = resolution;
        if (priority) complaint.priority = priority;
        if (!complaint.assignedTo) complaint.assignedTo = req.user.id;

        await complaint.save();

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

// Get consumers
router.get('/consumers', async (req, res) => {
    try {
        const { search } = req.query;

        const where = { role: 'CONSUMER' };
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { consumerId: { [Op.like]: `%${search}%` } }
            ];
        }

        const consumers = await User.findAll({
            where,
            attributes: ['id', 'name', 'email', 'consumerId', 'address', 'phone', 'status', 'zoneId'],
            include: [{ model: Zone, as: 'zone', attributes: ['id', 'name'] }],
            order: [['name', 'ASC']]
        });

        res.json(consumers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch consumers' });
    }
});

// Submit meter reading
router.post('/meter-readings', async (req, res) => {
    try {
        const { userId, meterId, currentReading, readingDate, notes } = req.body;

        if (!userId || !meterId || !currentReading || !readingDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get previous reading
        const previousReading = await MeterReading.findOne({
            where: { userId },
            order: [['readingDate', 'DESC']]
        });

        const prevValue = previousReading ? previousReading.currentReading : 0;
        const consumption = currentReading - prevValue;

        const reading = await MeterReading.create({
            userId,
            meterId,
            previousReading: prevValue,
            currentReading,
            consumption,
            readingDate,
            recordedBy: req.user.id,
            notes
        });

        // Generate bill
        const billNumber = `INV-${Date.now()}`;
        const amount = (consumption * 0.003).toFixed(2); // Mock rate: $0.003 per liter
        const dueDate = new Date(readingDate);
        dueDate.setDate(dueDate.getDate() + 15);

        await Bill.create({
            userId,
            billNumber,
            billingPeriod: new Date(readingDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            usage: consumption,
            amount: parseFloat(amount),
            dueDate,
            status: 'Pending'
        });

        res.status(201).json({ reading, message: 'Meter reading recorded and bill generated' });
    } catch (error) {
        console.error('Meter reading error:', error);
        res.status(500).json({ error: 'Failed to record meter reading' });
    }
});

export default router;
