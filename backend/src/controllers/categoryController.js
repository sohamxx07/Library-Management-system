
const { Category, Book } = require("../models");

const {
    handle200,
    handle400,
    handle201,
    handle404,
    handle500,
} = require("../helpers/helper");

const getCategory = async (req, res) => {
    try {
        const data = await Category.findAll();

        return handle200(res, data, "Categories Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Category.findByPk(id);

        if (!data) {
            return handle404(res, "Category Not Found");
        }

        return handle200(res, data, "Category Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const createCategory = async (req, res) => {
    try {
        const data = await Category.create(req.body);

        return handle201(res, data, "Category Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findByPk(id);

        if (!category) {
            return handle404(res, "Category Not Found");
        }

        await category.update(req.body);

        return handle200(res, category, "Category Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id

        const category = await Category.findByPk(id)

        if (!category) {
            return handle404(res, "Category Not Found")
        }

        const bookCheck = await Book.findAll({
            where: {
                categoryId: id
            }
        })

        if (bookCheck.length > 0) {
            return handle404(
                res,
                "Category Cannot Be Deleted Because Books Exist"
            )
        }

        await category.destroy()

        return handle200(res, null, "Category Deleted Successfully")
    }
    catch (err) {
        console.log(err)
        return handle500(res, "Server Down")
    }
}

module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};