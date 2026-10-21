const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/config/database.db",
    logging: false
})

sequelize.authenticate()
    .then(() => {
        console.log("Data Connection Established Successfully");
    })
    .catch(() => {
        console.log("Failed To Connect With Server", err);
    })

module.exports = sequelize