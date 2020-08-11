const mongoose = require("mongoose");

const warnsSchema = mongoose.Schema({
    warns: Array,
    user: String,
    guild: String,
});

module.exports = mongoose.model("Warns", warnsSchema, "system");