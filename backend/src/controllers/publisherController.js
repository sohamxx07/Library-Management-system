const { Publisher, Book } = require("../models");

const {
    handle200,
    handle201,
    handle400,
    handle404,
    handle500,
} = require("../helpers/helper");

const getPublisher = async (req, res) => {
    try {
        const data = await Publisher.findAll();

        return handle200(res, data, "Publishers Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const getPublisherById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Publisher.findByPk(id);

        if (!data) {
            return handle404(res, "Publisher Not Found");
        }

        return handle200(res, data, "Publisher Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const createPublisher = async (req, res) => {
    try {
        const data = await Publisher.create(req.body);

        return handle201(res, data, "Publisher Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const updatePublisher = async (req, res) => {
    try {
        const id = req.params.id;

        const publisher = await Publisher.findByPk(id);

        if (!publisher) {
            return handle404(res, "Publisher Not Found");
        }

        await publisher.update(req.body);

        return handle200(res, publisher, "Publisher Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};
const deletePublisher = async (req, res) => {
    try {
        const id = req.params.id

        const publisher = await Publisher.findByPk(id)

        if (!publisher) {
            return handle404(res, "Publisher Not Found")
        }

        const bookCheck = await Book.findAll({
            where: {
                publisherId: id
            }
        })

        if (bookCheck.length > 0) {
            return handle404(
                res,
                "Publisher Cannot Be Deleted Because Books Exist"
            )
        }

        await publisher.destroy()

        return handle200(res, null, "Publisher Deleted Successfully")
    }
    catch (err) {
        console.log(err)
        return handle500(res, "Server Down")
    }
}

module.exports = {
    getPublisher,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher,
};