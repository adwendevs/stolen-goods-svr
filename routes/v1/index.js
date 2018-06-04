const express = require("express");
const debug = require("debug")("app:apiv1");

const router = express.Router();

const userRoutes = require('./user');
const itemRoutes = require('./item');


router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;