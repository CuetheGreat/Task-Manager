import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'not started',
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    recurrencePattern: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nextRunDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Task;
