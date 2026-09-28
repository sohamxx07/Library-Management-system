// Import Express Framework
const express = require("express");

// Load Environment Variables (.env)
require("dotenv").config();

// Import All Models
const { sequelize } = require("./src/models");

// Import CORS Package
const cors = require("cors");

// Import Routes
const authorRoute = require("./src/routes/authorRoutes");
const categoryRoute = require("./src/routes/categoryRoutes");
const publisherRoute = require("./src/routes/publisherRoutes");
const memberRoute = require("./src/routes/memberRoutes");
const settingRoute = require("./src/routes/settingRoutes");
const bookRoute = require("./src/routes/bookRoutes");
const issueRoute = require("./src/routes/issueRoutes");
const dashboardRoute = require("./src/routes/dashboardRoutes");

// Create Express Application
const app = express();

// Get PORT Number from .env File
const PORT = process.env.PORT;

// Middleware to Accept JSON Data
app.use(express.json());

// Middleware to Accept Form Data
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Requests
app.use(cors());

// API Routes
app.use("/author", authorRoute);
app.use("/category", categoryRoute);
app.use("/publisher", publisherRoute);
app.use("/member", memberRoute);
app.use("/setting", settingRoute);
app.use("/book", bookRoute);
app.use("/issue", issueRoute);

// Synchronize Database
sequelize.sync()
    .then(() => {
        console.log("Database Synchronized Successfully");
    })
    .catch((err) => {
        console.log("Database Synchronization Failed", err);
    });

// Default Route
app.get("/", (req, res) => {
    res.send("Server is Running...");
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});