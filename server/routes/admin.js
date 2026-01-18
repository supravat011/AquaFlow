import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { User, Zone, SupplySchedule, Bill, Complaint, MeterReading } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// All routes require ADMIN role
router.use(authenticate, authorize('ADMIN'));

// Get admin dashboard analytics
router.get('/dashboard', async (req, res) => {
    try {
        // Total consumers
        const totalConsumers = await User.count({ where: { role: 'CONSUMER' } });

        // Revenue (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const revenueData = await Bill.findAll({
            where: {
                createdAt: { [Op.gte]: sixMonthsAgo },
                status: 'Paid'
            },
            attributes: [
                [Bill.sequelize.fn('DATE_FORMAT', Bill.sequelize.col('paidDate'), '%Y-%m'), 'month'],
                [Bill.sequelize.fn('SUM', Bill.sequelize.col('amount')), 'revenue']
            ],
            group: ['month'],
            order: [[Bill.sequelize.fn('DATE_FORMAT', Bill.sequelize.col('paidDate'), '%Y-%m'), 'ASC']]
        });

        // System uptime (mock)
        const uptime = 98.5;

        // Zones requiring maintenance
        const maintenanceZones = await Zone.count({ where: { status: 'Maintenance' } });

        res.json({
            totalConsumers,
            revenueData,
            uptime,
            maintenanceZones
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const { role, search } = req.query;

        const where = {};
        if (role) where.role = role;
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ];
        }

        const users = await User.findAll({
            where,
            attributes: ['id', 'name', 'email', 'role', 'status', 'consumerId', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create user
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, role, address, phone, zoneId } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if email exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const consumerId = role === 'CONSUMER' ? `${Date.now()}-${Math.floor(Math.random() * 1000)}` : null;

        const user = await User.create({
            name,
            email,
            password,
            role,
            consumerId,
            address,
            phone,
            zoneId,
            status: 'Active'
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
    } catch (error) {
        console.error('User creation error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Update user
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, status, address, phone, zoneId } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (status) user.status = status;
        if (address !== undefined) user.address = address;
        if (phone !== undefined) user.phone = phone;
        if (zoneId !== undefined) user.zoneId = zoneId;

        await user.save();

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Get all zones
router.get('/zones', async (req, res) => {
    try {
        const zones = await Zone.findAll({
            order: [['name', 'ASC']]
        });

        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch zones' });
    }
});

// Create zone
router.post('/zones', async (req, res) => {
    try {
        const { name, description, capacity, subAreas, status } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Zone name is required' });
        }

        const zone = await Zone.create({
            name,
            description,
            capacity,
            subAreas: subAreas || 0,
            status: status || 'Active'
        });

        res.status(201).json(zone);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create zone' });
    }
});

// Get reports
router.get('/reports', async (req, res) => {
    try {
        const { type } = req.query;

        const reports = {
            consumption: {
                title: 'Water Consumption Report',
                type: 'Daily Log',
                size: '2.4 MB',
                generated: new Date()
            },
            revenue: {
                title: 'Revenue & Billing Analysis',
                type: 'Financial',
                size: '1.8 MB',
                generated: new Date()
            },
            complaints: {
                title: 'Complaint Resolution Stats',
                type: 'Operational',
                size: '850 KB',
                generated: new Date()
            },
            performance: {
                title: 'Zone Performance Audit',
                type: 'Technical',
                size: '5.2 MB',
                generated: new Date()
            }
        };

        if (type && reports[type]) {
            res.json(reports[type]);
        } else {
            res.json(Object.values(reports));
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

export default router;
