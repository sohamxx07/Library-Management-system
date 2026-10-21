
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Setting = sequelize.define(
    "Setting",
    {
        libraryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issueDays: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        finePerDay: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Setting;