const express = require("express");
const routes = express.Router();

// Controllers
const authController = require("./controllers/authController");
const messageController = require("./controllers/messageController");

// Auth Routes
routes.post("/auth/signin", authController.show);
routes.post("/auth/signup", authController.store);

// Message Routes
routes.get("/messages", messageController.index);
routes.post("/messages", messageController.store);

module.exports = routes;
