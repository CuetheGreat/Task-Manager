import { DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateCreates: {
        type: DataTypes.DATE,
        defaultValue: new Date().now(),
    },
})

export default User