
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define(
    "Book",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalCopies: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableCopies: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shelfNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Book.associate = (models) => {
    Book.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "categoryData"
    });


    Book.belongsTo(models.Author, {
        foreignKey: "authorId",
        as: "authorData"
    });

    Book.belongsTo(models.Publisher, {
        foreignKey: "publisherId",
        as: "publisherData"
    });


    Book.hasMany(models.Issue, {
        foreignKey: "bookId",
        as: "issueData"
    });

}

module.exports = Book;