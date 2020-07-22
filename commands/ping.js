const Discord = require("discord.js");
const botconfig = require("../botSettings.json");

module.exports.run = (client, message, args) => {
    return message.channel.send(`Pong ${client.ws.ping}`)
}

module.exports.config = {
    name: "ping",
    description: "Shows the Ping Latency",
    usage: "*ping",
    accessableby: "Members",
    aliases: []
}