const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "cum",
    description: "Sends a random imageURL from Discord for the tag: cum",
    usage: "cum",
    accessableby: "Members",
    aliases: [],
    category: "nsfw",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        const akanekoSan = new MessageEmbed()
        .setImage(akaneko.nsfw.cum())
        
        return message.channel.send(akanekoSan)
    }
}