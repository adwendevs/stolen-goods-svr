const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
    type: String,
    customMessage: String,
    errorMessage: String,
    errorStack: String,
    data: { type: Object, default: null },
    addedOn: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('logs', LogSchema);