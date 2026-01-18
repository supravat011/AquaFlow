import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MeterReading = sequelize.define('MeterReading', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    meterId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    previousReading: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    currentReading: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    consumption: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    readingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    recordedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        comment: 'Staff member who recorded the reading'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

export default MeterReading;
