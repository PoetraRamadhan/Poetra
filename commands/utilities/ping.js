const Discord = require("discord.js");
module.exports = {
    name: "ping",
    description: "Sends the latency info",
    usage: "ping",
    accessableby: "Members",
    aliases: [],
    category: "utilities",
    run: async (client, message, args) => {
        return message.channel.send(`\`\`Latency: ${Date.now() - message.createdTimestamp}ms\nWebSocket Latency: ${client.ws.ping}ms\`\``)
    }
}