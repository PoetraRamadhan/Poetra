const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "panties",
    description: "I mean... just why? You like underwear?",
    usage: "panties",
    accessableby: "Members",
    aliases: [],
    category: "nsfw",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        const akanekoSan = new MessageEmbed()
        .setImage(akaneko.nsfw.panties())
        
        return message.channel.send(akanekoSan)
    }
}