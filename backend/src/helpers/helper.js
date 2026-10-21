const handle200 = (res, data = null, message = "Success") => {

    return res.status(200).json({
        status: true,
        data,
        message
    })
}

const handle201 = (res, data = null, message = "Created Successfully") => {
    return res.status(201).json({
        status: true,
        data,
        message
    });
};

const handle404 = (res, message = "Data Not Found") => {
    return res.status(404).json({
        status: false,
        message,
    });
};

const handle400 = (res, message = "Bad Request") => {

    return res.status(400).json({
        status: false,
        message
    })
}

const handle500 = (res, message = "Internal Server Error") => {
    return res.status(500).json({
        status: false,
        message,
    });
};

module.exports = {
    handle200,
    handle201,
    handle404,
    handle400,
    handle500,
};