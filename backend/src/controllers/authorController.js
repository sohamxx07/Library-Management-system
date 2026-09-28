const Author = require("../models/Author");

const {
    handle200,
    handle201,
    handle404,
    handle500,
} = require("../helpers/helper");

const getAuthor = async (req, res) => {
    try {
        const data = await Author.findAll();

        return handle200(res, data, "Authors Fetched Successfully");
    }
    catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Author.findByPk(id);

        if (!data) {
            return handle404(res, "Author Not Found");
        }

        return handle200(res, data, "Author Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const createAuthor = async (req, res) => {
    try {
        const data = await Author.create(req.body);

        return handle201(res, data, "Author Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id;

        const author = await Author.findByPk(id);

        if (!author) {
            return handle404(res, "Author Not Found");
        }

        await author.update(req.body);

        return handle200(res, author, "Author Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};
const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id

        const author = await Author.findByPk(id)

        if (!author) {
            return handle404(res, "Author Not Found")
        }

        const bookCheck = await Book.findAll({
            where: {
                authorId: id
            }
        })

        if (bookCheck.length > 0) {
            return handle404(
                res,
                "Author Cannot Be Deleted Because Books Exist"
            )
        }

        await author.destroy()

        return handle200(res, null, "Author Deleted Successfully")
    }
    catch (err) {
        console.log(err)
        return handle500(res, "Server Down")
    }
}

module.exports = {
    getAuthor,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};