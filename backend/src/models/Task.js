import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'not started',
    },
})

export default Task