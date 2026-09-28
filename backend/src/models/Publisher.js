
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Publisher = sequelize.define(
    "Publisher",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

Publisher.associate = (models) => {
    Publisher.hasMany(models.Book, {
        foreignKey: "publisherId",
        as: "bookData"
    });
};



module.exports = Publisher;