const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "ass",
    description: "Sends a random imageURL for some anime ass~ uwu",
    usage: "ass",
    accessableby: "Members",
    aliases: [],
    category: "nsfw",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        const akanekoSan = new MessageEmbed()
        .setImage(akaneko.nsfw.ass())
        
        return message.channel.send(akanekoSan)
    }
}