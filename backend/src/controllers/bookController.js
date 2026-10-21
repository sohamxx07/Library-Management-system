const { Book, Category, Author, Publisher } = require("../models");

const {
    handle200,
    handle201,
    handle404,
    handle500,
} = require("../helpers/helper");
const { Model } = require("sequelize");
const Issue = require("../models/Issue");

// Get All Books
const getBook = async (req, res) => {
    try {
        const data = await Book.findAll({
            include: [
                {
                    model: Category,
                    as: "categoryData",
                },
                {
                    model: Author,
                    as: "authorData",
                },
                {
                    model: Publisher,
                    as: "publisherData",
                },
            ],
        });

        return handle200(res, data, "Books Fetched Successfully");
    }
    catch (err) {
        console.log(err);
        return handle500(res);
    }
};

// Get Book By Id
const getBookById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Book.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: "categoryData",
                },
                {
                    model: Author,
                    as: "authorData",
                },
                {
                    model: Publisher,
                    as: "publisherData",
                },
            ],
        });

        if (!data) {
            return handle404(res, "Book Not Found");
        }

        return handle200(res, data, "Book Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

// Create Book
const createBook = async (req, res) => {
    try {
        const data = await Book.create(req.body);

        return handle201(res, data, "Book Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findByPk(id);

        if (!book) {
            return handle404(res, "Book Not Found");
        }

        await book.update(req.body);

        return handle200(res, book, "Book Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

// Delete Book
// Delete Book
const deleteBook = async (req, res) => {
    try {
        const id = req.params.id

        // Find Book
        const book = await Book.findByPk(id)

        if (!book) {
            return handle404(res, "Book Not Found")
        }

        // Check Issue Records
        const issueCheck = await Issue.findAll({
            where: {
                bookId: id
            }
        })

        // If Issue exists, don't delete Book
        if (issueCheck.length > 0) {
            return handle404(
                res,
                "Book Cannot Be Deleted Because Issue Records Exist"
            )
        }

        // Delete Book
        await book.destroy()

        return handle200(res, null, "Book Deleted Successfully")
    }
    catch (err) {
        console.log(err)

        return handle500(res, "Server Down")
    }
}

module.exports = {
    getBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};