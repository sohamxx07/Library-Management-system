
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define(
    "Member",
    {
        memberCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Member.associate = (models) => {
    Member.hasMany(models.Issue, {
        foreignKey: "memberId",
        as: "issueData"
    });
};


module.exports = Member;