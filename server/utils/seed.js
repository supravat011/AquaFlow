import { sequelize, User, Zone, SupplySchedule, Bill, Complaint, MeterReading, Notification } from '../models/index.js';

const seedDatabase = async () => {
    try {
        console.log('Starting database seed...');

        // Sync database
        await sequelize.sync({ force: true });
        console.log('✓ Database reset');

        // Create Zones
        const zones = await Zone.bulkCreate([
            {
                name: 'Zone 4 - North District',
                description: 'Covering residential sectors 7-12 and industrial area A',
                capacity: 50.0,
                subAreas: 5,
                status: 'Active'
            },
            {
                name: 'Zone 5 - East Wing',
                description: 'Commercial district and downtown area',
                capacity: 80.0,
                subAreas: 3,
                status: 'Maintenance'
            },
            {
                name: 'Zone 6 - South Sector',
                description: 'Mixed residential and commercial zones',
                capacity: 65.0,
                subAreas: 4,
                status: 'Active'
            }
        ]);
        console.log('✓ Zones created');

        // Create Users
        const users = await User.bulkCreate([
            {
                name: 'Admin User',
                email: 'admin@aquaflow.com',
                password: 'admin123',
                role: 'ADMIN',
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
            },
            {
                name: 'Field Technician',
                email: 'staff@aquaflow.com',
                password: 'staff123',
                role: 'STAFF',
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=Staff+Member&background=4F46E5&color=fff'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'consumer123',
                role: 'CONSUMER',
                consumerId: '8829-192-X',
                address: '12 Box Street, Zone 4',
                phone: '+1-555-0101',
                zoneId: zones[0].id,
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10B981&color=fff'
            },
            {
                name: 'Sarah Smith',
                email: 'sarah@example.com',
                password: 'consumer123',
                role: 'CONSUMER',
                consumerId: '8829-193-Y',
                address: '14 Elm Road, Zone 4',
                phone: '+1-555-0102',
                zoneId: zones[0].id,
                status: 'Active',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=10B981&color=fff'
            },
            {
                name: 'Mike Johnson',
                email: 'mike@example.com',
                password: 'consumer123',
                role: 'CONSUMER',
                consumerId: '8829-194-Z',
                address: '8 Pine Lane, Zone 4',
                phone: '+1-555-0103',
                zoneId: zones[0].id,
                status: 'Disconnected',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10B981&color=fff'
            }
        ]);
        console.log('✓ Users created');

        // Create Supply Schedules
        await SupplySchedule.bulkCreate([
            {
                zoneId: zones[0].id,
                morningSlot: '06:00 AM - 08:30 AM',
                eveningSlot: '05:30 PM - 07:00 PM',
                status: 'On Time',
                effectiveDate: new Date()
            },
            {
                zoneId: zones[1].id,
                morningSlot: '06:30 AM - 09:00 AM',
                eveningSlot: '06:00 PM - 07:30 PM',
                status: 'Delayed',
                effectiveDate: new Date()
            },
            {
                zoneId: zones[2].id,
                morningSlot: '05:30 AM - 08:00 AM',
                eveningSlot: '05:00 PM - 06:30 PM',
                status: 'On Time',
                effectiveDate: new Date()
            }
        ]);
        console.log('✓ Supply schedules created');

        // Create Bills
        const consumerUser = users.find(u => u.role === 'CONSUMER');
        await Bill.bulkCreate([
            {
                userId: consumerUser.id,
                billNumber: 'INV-2024-12-8829',
                billingPeriod: 'December 2024',
                usage: 14500,
                amount: 42.50,
                dueDate: new Date('2025-01-15'),
                status: 'Overdue'
            },
            {
                userId: consumerUser.id,
                billNumber: 'INV-2024-11-8829',
                billingPeriod: 'November 2024',
                usage: 13200,
                amount: 38.20,
                dueDate: new Date('2024-12-15'),
                status: 'Paid',
                paidDate: new Date('2024-12-10'),
                paymentMethod: 'Online',
                transactionId: 'TXN-88219'
            },
            {
                userId: consumerUser.id,
                billNumber: 'INV-2024-10-8829',
                billingPeriod: 'October 2024',
                usage: 15000,
                amount: 45.00,
                dueDate: new Date('2024-11-15'),
                status: 'Paid',
                paidDate: new Date('2024-11-05'),
                paymentMethod: 'Online',
                transactionId: 'TXN-77123'
            }
        ]);
        console.log('✓ Bills created');

        // Create Complaints
        await Complaint.bulkCreate([
            {
                complaintNumber: 'CMP-2024-001',
                userId: consumerUser.id,
                category: 'Low Pressure',
                description: 'Water pressure is very low in the mornings.',
                status: 'In Progress',
                priority: 'Medium',
                assignedTo: users.find(u => u.role === 'STAFF').id
            },
            {
                complaintNumber: 'CMP-2024-002',
                userId: consumerUser.id,
                category: 'No Water',
                description: 'No water supply since yesterday evening.',
                status: 'Resolved',
                priority: 'High',
                assignedTo: users.find(u => u.role === 'STAFF').id,
                resolution: 'Pipeline issue fixed. Supply restored.',
                resolvedDate: new Date('2024-04-23')
            },
            {
                complaintNumber: 'CMP-2024-003',
                userId: consumerUser.id,
                category: 'Leakage',
                description: 'Main pipe leaking near Park Avenue.',
                status: 'Open',
                priority: 'High'
            }
        ]);
        console.log('✓ Complaints created');

        // Create Meter Readings
        const months = ['2024-07-01', '2024-08-01', '2024-09-01', '2024-10-01', '2024-11-01', '2024-12-01'];
        let previousReading = 100000;

        for (const month of months) {
            const consumption = 12000 + Math.floor(Math.random() * 4000);
            const currentReading = previousReading + consumption;

            await MeterReading.create({
                userId: consumerUser.id,
                meterId: 'M-4921',
                previousReading,
                currentReading,
                consumption,
                readingDate: new Date(month),
                recordedBy: users.find(u => u.role === 'STAFF').id
            });

            previousReading = currentReading;
        }
        console.log('✓ Meter readings created');

        // Create Notifications
        await Notification.bulkCreate([
            {
                userId: consumerUser.id,
                type: 'Bill Due',
                title: 'Bill Payment Due',
                message: 'Your water bill of $42.50 is due on Jan 15, 2025',
                priority: 'High',
                isRead: false
            },
            {
                userId: consumerUser.id,
                type: 'Supply Alert',
                title: 'Maintenance Scheduled',
                message: 'Water supply will be affected on Jan 24 between 10 AM - 2 PM',
                priority: 'Medium',
                isRead: false
            }
        ]);
        console.log('✓ Notifications created');

        console.log('\n✅ Database seeded successfully!\n');
        console.log('Login Credentials:');
        console.log('─────────────────────────────────────');
        console.log('Admin:    admin@aquaflow.com / admin123');
        console.log('Staff:    staff@aquaflow.com / staff123');
        console.log('Consumer: john@example.com / consumer123');
        console.log('─────────────────────────────────────\n');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();
