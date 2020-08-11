const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "lewdbomb",
    description: "Sends a bunch of images",
    usage: "lewdbomb",
    accessableby: "Members",
    aliases: [],
    category: "nsfw",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        message.channel.send(akaneko.lewdBomb(5));
    }
}