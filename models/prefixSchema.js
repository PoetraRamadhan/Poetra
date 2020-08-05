const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const prefixSchema = mongoose.Schema({
  _id: reqString,
  guildId: reqString,
  guildName: reqString,
  prefix: reqString,
});

module.exports = mongoose.model("GuildPrefixes", prefixSchema)