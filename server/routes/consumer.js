import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { User, Bill, Complaint, SupplySchedule, Zone, MeterReading } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// All routes require CONSUMER role
router.use(authenticate, authorize('CONSUMER'));

// Get dashboard data
router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.user.id;

        // Get current bill
        const currentBill = await Bill.findOne({
            where: { userId, status: { [Op.ne]: 'Paid' } },
            order: [['dueDate', 'ASC']]
        });

        // Get supply schedule
        const schedule = await SupplySchedule.findOne({
            where: { zoneId: req.user.zoneId },
            include: [{ model: Zone, as: 'zone' }],
            order: [['effectiveDate', 'DESC']]
        });

        // Get recent complaints
        const complaints = await Complaint.findAll({
            where: { userId },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        // Get consumption data (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const readings = await MeterReading.findAll({
            where: {
                userId,
                readingDate: { [Op.gte]: sixMonthsAgo }
            },
            order: [['readingDate', 'ASC']]
        });

        res.json({
            currentBill,
            schedule,
            complaints,
            consumptionData: readings
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Get supply schedule
router.get('/supply-schedule', async (req, res) => {
    try {
        const schedules = await SupplySchedule.findAll({
            where: { zoneId: req.user.zoneId },
            include: [{ model: Zone, as: 'zone' }],
            order: [['effectiveDate', 'DESC']],
            limit: 10
        });

        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch supply schedule' });
    }
});

// Get bills
router.get('/bills', async (req, res) => {
    try {
        const bills = await Bill.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bills' });
    }
});

// Pay bill
router.post('/bills/:id/pay', async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentMethod } = req.body;

        const bill = await Bill.findOne({
            where: { id, userId: req.user.id }
        });

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        if (bill.status === 'Paid') {
            return res.status(400).json({ error: 'Bill already paid' });
        }

        bill.status = 'Paid';
        bill.paidDate = new Date();
        bill.paymentMethod = paymentMethod || 'Online';
        bill.transactionId = `TXN-${Date.now()}`;
        await bill.save();

        res.json({ message: 'Payment successful', bill });
    } catch (error) {
        res.status(500).json({ error: 'Payment failed' });
    }
});

// Get complaints
router.get('/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Submit complaint
router.post('/complaints', async (req, res) => {
    try {
        const { category, description, imageUrl } = req.body;

        if (!category || !description) {
            return res.status(400).json({ error: 'Category and description are required' });
        }

        const complaintNumber = `CMP-${Date.now()}`;

        const complaint = await Complaint.create({
            complaintNumber,
            userId: req.user.id,
            category,
            description,
            imageUrl,
            status: 'Open',
            priority: category === 'No Water' ? 'High' : 'Medium'
        });

        res.status(201).json(complaint);
    } catch (error) {
        console.error('Complaint creation error:', error);
        res.status(500).json({ error: 'Failed to create complaint' });
    }
});

export default router;
