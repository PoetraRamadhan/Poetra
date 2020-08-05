const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildNamw: String,
    prefix: String,
});

module.exports = mongoose.model("Guild", guildSchema, "guilds");