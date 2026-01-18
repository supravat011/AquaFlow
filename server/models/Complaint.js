import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Complaint = sequelize.define('Complaint', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    complaintNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('No Water', 'Low Pressure', 'Leakage', 'Water Quality', 'Billing', 'Other'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Resolved'),
        defaultValue: 'Open'
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
        defaultValue: 'Medium'
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true
    },
    resolution: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resolvedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Complaint;
