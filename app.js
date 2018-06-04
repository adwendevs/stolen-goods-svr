const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// DB Config
const db = require('./core/config').MONGODB_URL;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiV1 = require("./routes/v1");

// Use Routes
app.use('/api/v1/', apiV1);


app.all("*", (req, res) => {
    res.status(401).json({ code: 401, message: "Not found." });
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

