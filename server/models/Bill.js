import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Bill = sequelize.define('Bill', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    billNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    billingPeriod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Usage in Liters'
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Paid', 'Pending', 'Overdue'),
        defaultValue: 'Pending'
    },
    paidDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Bill;
