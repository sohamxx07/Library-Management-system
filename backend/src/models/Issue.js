const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Issue = sequelize.define(
    "Issue",
    {
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        issueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fineAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    }
);

Issue.associate = (model) => {
    Issue.belongsTo(model.Book, {
        foreignKey: "bookId",
        as: "bookData"
    }),
        Issue.belongsTo(model.Member, {
            foreignKey: "memberId",
            as: "memberData"
        })
}


module.exports = Issue;