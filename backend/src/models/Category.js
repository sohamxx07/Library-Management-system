const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
    "Category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Category.associate = (models) => {
    Category.hasMany(models.Book, {
        foreignKey: "categoryId",
        as: "bookData"
    });
}

module.exports = Category;