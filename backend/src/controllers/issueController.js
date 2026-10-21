const {
    handle200,
    handle500,
    handle404,
    handle201
} = require("../helpers/helper");
const Book = require("../models/Book");
const Issue = require("../models/Issue");
const Member = require("../models/Member");

// Get All Issues
const getIssue = async (req, res) => {
    try {
        const data = await Issue.findAll({
            include: [
                {
                    model: Book,
                    as: "bookData"
                },
                {
                    model: Member,
                    as: "memberData"
                }
            ]
        })
        return handle200(res, data, "Issue Feached")

    }
    catch (err) {
        console.log(err);
        return handle500(res, "Server Down")
    }
};


// Get Issue By ID
const getIssueById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Issue.findByPk(id, {
            include: [
                {
                    model: Book,
                    as: "bookData"
                },
                {
                    model: Member,
                    as: "memberData"
                }
            ]
        })
        if (!data) {
            return handle404(res, "Issue Not Found ")
        }

        return handle200(res, data, "Fetched By Id")
    }
    catch (err) {
        console.log(err);
        return handle500(res, "Server Down")
    }
}

// Create Issue

const createIssue = async (req, res) => {

    try {
        const data = req.body

        const { bookId, memberId } = req.body

        const bookData = await Book.findByPk(bookId)

        if (!bookData) {
            return handle404(res, "Book Not Available ")
        }

        if (bookData.availableCopies <= 0) {
            return handle404(res, "Book Not Available ")
        }


        const memberData = await Member.findByPk(memberId)

        if (!memberData) {
            return handle404(res, "Membr Not Found")
        }

        const availableItem = bookData.availableCopies - 1

        await bookData.update({
            availableCopies: availableItem
        })

        const createData = await Issue.create(data)
        return handle201(res, createData, "Created")
    }


    catch (err) {
        console.log(err);
        return handle500(res, "Server Down")
    }
}


// Update Issue

const updateIssue = async (req, res) => {
    try {

        const id = req.params.id
        const data = req.body

        // Find existing issue
        const updated = await Issue.findByPk(id)

        if (!updated) {
            return handle404(res, "Issue Not Found")
        }

        // Find the book which belongs to this issue
        const bookdata = await Book.findByPk(updated.bookId)

        if (!bookdata) {
            return handle404(res, "Book Not Found")
        }

        // Check whether book is being returned
        if (
            updated.status !== "Returned" &&
            data.status === "Returned"
        ) {

            const bookReturn = bookdata.availableCopies + 1

            await bookdata.update({
                availableCopies: bookReturn
            })
        }

        // Update issue
        await updated.update(data)

        return handle200(
            res,
            updated,
            "Issue Updated"
        )

    }
    catch (err) {
        console.log(err)

        return handle500(
            res,
            "Server Down"
        )
    }
}


// Delete Issue
const deleteIssue = async (req, res) => {
    try {
        const id = req.params.id

        const deleteissue = await Issue.findByPk(id)

        if (!deleteissue) {
            return handle404(res, "Issue Not Found")
        }

        const bookData = await Book.findByPk(deleteissue.bookId)

        if (!bookData) {
            return handle404(res, "Book Not Found")
        }

        if (deleteissue.status !== "Returned") {
            const availableCopies = bookData.availableCopies + 1

            await bookData.update({
                availableCopies: availableCopies
            })
        }

        await deleteissue.destroy()

        return handle200(res, null, "Issue Deleted Successfully")
    }
    catch (err) {
        console.log(err)
        return handle500(res, "Server Down")
    }
};


module.exports = {
    getIssue,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
};


