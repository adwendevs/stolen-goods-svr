const express = require("express");
const debug = require("debug")("app:apiv1:itemRoutes");

// Core modules (Application Logic and Utilities)
const util = require("../../core/util");

// MongoDB Models
const Item = require('../../models/item');

const router = express.Router();

router.get("/", async (req, res) => {
    // fetch all items from mongoDB
    // (NB: pagination will be added, see  "mongoose-paginate" in package.json)

    //const items = await Item.find(...)
    res.status(201).json(util.createJsonMessage({
        code: 200,
        message: "",
        data: {
            item: [] // use "item"
        }
    }));
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // find item from mongoDB
        //const item = await Item.findOne(...)
        res.status(201).json(util.createJsonMessage({
            code: 200,
            message: "",
            data: {
                item: [] // use "item"
            }
        }));

    } catch (error) {
        logger.logAsRuntimeError({
            message: "GET: /items/:id",
            error,
            // NB: req.query will be added later for filtering
            // and sorting queries
            data: Object.assign(req.params, req.query)
        });

        res
            .status(500)
            .json(
                util.createJsonError(
                    500,
                    "Sorry, an internal server error occured."
                )
            );
    }
});

router.post("/add", async (req, res) => {
    // see models/item.js for all required and 
    // option parameters
    const {
        name,
        model,
        latitude,
        longitude,
        description,
        region,
        district,
        address
    } = req.body;

    try {
        // validate all data (NB: some are optional, see models/item.js)

        //const item = new Item(req.body)
        // await item.save();
        res.status(201).json(util.createJsonMessage({
            code: 200,
            message: "",
            data: {
                item: [] // use "item"
            }
        }));

    } catch (error) {
        logger.logAsRuntimeError({
            message: "POST: /items/add",
            error,
            data: req.body
        });

        res
            .status(500)
            .json(
                util.createJsonError(
                    500,
                    "Sorry, an internal server error occured."
                )
            );
    }
});

module.exports = router;