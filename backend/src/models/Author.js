const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define(
    "Author",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Author.associate = (models) => {
    Author.hasMany(models.Book, {
        foreignKey: "authorId",
        as: "bookData"
    });
};


module.exports = Author;