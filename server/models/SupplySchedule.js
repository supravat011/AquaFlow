import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SupplySchedule = sequelize.define('SupplySchedule', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    zoneId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    morningSlot: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '06:00 AM - 08:30 AM'
    },
    eveningSlot: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '05:30 PM - 07:00 PM'
    },
    status: {
        type: DataTypes.ENUM('On Time', 'Delayed', 'Maintenance'),
        defaultValue: 'On Time'
    },
    effectiveDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

export default SupplySchedule;
