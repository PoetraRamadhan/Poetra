
const Discord = require("discord.js");
const { prefix } = require("../botSettings.json");

module.exports = client => { 
    console.log(`${client.user.username} is online`)
    client.user.setActivity(`${prefix}invite | Under Development`, {type: "PLAYING"});
}