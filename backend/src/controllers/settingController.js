
const Setting = require("../models/Setting");

const {
    handle200,
    handle201,
    handle404,
    handle500,
} = require("../helpers/helper");

const getSetting = async (req, res) => {
    try {
        const data = await Setting.findAll();

        return handle200(res, data, "Settings Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const getSettingById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Setting.findByPk(id);

        if (!data) {
            return handle404(res, "Setting Not Found");
        }

        return handle200(res, data, "Setting Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const createSetting = async (req, res) => {
    try {
        const data = await Setting.create(req.body);

        return handle201(res, data, "Setting Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const updateSetting = async (req, res) => {
    try {
        const id = req.params.id;

        const setting = await Setting.findByPk(id);

        if (!setting) {
            return handle404(res, "Setting Not Found");
        }

        await setting.update(req.body);

        return handle200(res, setting, "Setting Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const deleteSetting = async (req, res) => {
    try {
        const id = req.params.id;

        const setting = await Setting.findByPk(id);

        if (!setting) {
            return handle404(res, "Setting Not Found");
        }

        await setting.destroy();

        return handle200(res, null, "Setting Deleted Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

module.exports = {
    getSetting,
    getSettingById,
    createSetting,
    updateSetting,
    deleteSetting,
};