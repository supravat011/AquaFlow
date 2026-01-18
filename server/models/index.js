import sequelize from '../config/database.js';
import User from './User.js';
import Zone from './Zone.js';
import SupplySchedule from './SupplySchedule.js';
import Bill from './Bill.js';
import Complaint from './Complaint.js';
import MeterReading from './MeterReading.js';
import Notification from './Notification.js';

// Define associations
User.belongsTo(Zone, { foreignKey: 'zoneId', as: 'zone' });
Zone.hasMany(User, { foreignKey: 'zoneId', as: 'consumers' });

Zone.hasMany(SupplySchedule, { foreignKey: 'zoneId', as: 'schedules' });
SupplySchedule.belongsTo(Zone, { foreignKey: 'zoneId', as: 'zone' });

User.hasMany(Bill, { foreignKey: 'userId', as: 'bills' });
Bill.belongsTo(User, { foreignKey: 'userId', as: 'consumer' });

User.hasMany(Complaint, { foreignKey: 'userId', as: 'complaints' });
Complaint.belongsTo(User, { foreignKey: 'userId', as: 'consumer' });
Complaint.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

User.hasMany(MeterReading, { foreignKey: 'userId', as: 'meterReadings' });
MeterReading.belongsTo(User, { foreignKey: 'userId', as: 'consumer' });
MeterReading.belongsTo(User, { foreignKey: 'recordedBy', as: 'recorder' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
    sequelize,
    User,
    Zone,
    SupplySchedule,
    Bill,
    Complaint,
    MeterReading,
    Notification
};
