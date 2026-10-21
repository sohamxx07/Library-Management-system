
const Member = require("../models/Member");
const Issue = require("../models/Issue");

const {
    handle200,
    handle201,
    handle404,
    handle500,
} = require("../helpers/helper");

const getMember = async (req, res) => {
    try {
        const data = await Member.findAll();

        return handle200(res, data, "Members Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const getMemberById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await Member.findByPk(id);

        if (!data) {
            return handle404(res, "Member Not Found");
        }

        return handle200(res, data, "Member Fetched Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const createMember = async (req, res) => {
    try {
        const data = await Member.create(req.body);

        return handle201(res, data, "Member Created Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};

const updateMember = async (req, res) => {
    try {
        const id = req.params.id;

        const member = await Member.findByPk(id);

        if (!member) {
            return handle404(res, "Member Not Found");
        }

        await member.update(req.body);

        return handle200(res, member, "Member Updated Successfully");
    } catch (err) {
        console.log(err);
        return handle500(res);
    }
};
const deleteMember = async (req, res) => {
    try {
        const id = req.params.id

        const member = await Member.findByPk(id)

        if (!member) {
            return handle404(res, "Member Not Found")
        }

        const issueCheck = await Issue.findAll({
            where: {
                memberId: id
            }
        })

        if (issueCheck.length > 0) {
            return handle404(
                res,
                "Member Cannot Be Deleted Because Issue Records Exist"
            )
        }

        await member.destroy()

        return handle200(res, null, "Member Deleted Successfully")
    }
    catch (err) {
        console.log(err)
        return handle500(res, "Server Down")
    }
}

module.exports = {
    getMember,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
};