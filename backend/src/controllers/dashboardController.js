const {
    handle200,
    handle500
} = require("../helpers/helper");

const { Op } = require("sequelize");
const Book = require("../models/Book");
const Member = require("../models/Member");
const Issue = require("../models/Issue");


// Get Dashboard Data
const getDashboard = async (req, res) => {
    try {

        // Total Books
        const totalBooks = await Book.sum("totalCopies") || 0;

        // Available Books
        const availableBooks = await Book.sum("availableCopies") || 0;

        // Total Members
        const totalMembers = await Member.count();

        // Issued Books
        const issuedBooks = await Issue.count({
            where: {
                status: "Issued"
            }
        });

        // Overdue Books
        const overdueBooks = await Issue.count({
            where: {
                status: "Issued",
                dueDate: {
                    [Op.lt]: new Date()
                }
            }
        });

        return handle200(
            res,
            {
                totalBooks,
                availableBooks,
                issuedBooks,
                overdueBooks,
                totalMembers
            },
            "Dashboard Data Fetched Successfully"
        );

    }
    catch (err) {
        console.log(err);
        return handle500(res, "Server Down");
    }
};

module.exports = {
    getDashboard
};