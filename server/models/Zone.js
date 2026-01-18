import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Zone = sequelize.define('Zone', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    capacity: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Capacity in ML/day'
    },
    subAreas: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('Active', 'Maintenance', 'Inactive'),
        defaultValue: 'Active'
    }
}, {
    timestamps: true
});

export default Zone;
