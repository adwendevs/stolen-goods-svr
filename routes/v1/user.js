const express = require("express");
const debug = require("debug")("app:apiv1:userRoutes");

// Core modules (Application Logic and Utilities)
const util = require("../../core/util");

// MongoDB Models
const User = require('../../models/user');

const router = express.Router();

// NB: Routes are not authenticated ATM
// authentication will be added soon


router.post("/sign_up", async (req, res) => {
    const { email, password, name } = req.body;
    //validate with validator (see package.json)
    //save to mongodb
    res.status(201).json(util.createJsonMessage({
        code: 200,
        message: ""
    }));
});

router.post("/create_token", async (req, res) => {
    const { email, password } = req.body;
    // validate email and password (see "validator" in package.json)
    // fetch user from db and generate token
    res.status(201).json(util.createJsonMessage({
        code: 200,
        data: {
            token: ""
        }
    }));
});

router.get("/sign_up", async (req, res) => { });

module.exports = router;