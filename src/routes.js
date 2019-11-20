const express = require("express");
const routes = express.Router();

// Controllers
const authController = require("./controllers/authController");

// Auth Routes
routes.post("/auth/signin", authController.show);
routes.post("/auth/signup", authController.store);

module.exports = routes;
