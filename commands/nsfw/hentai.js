const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "hentai",
    description: "Sends hentai. what do you expect huh?",
    usage: "hentai",
    accessableby: "Members",
    aliases: [],
    category: "nsfw",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        const akanekoSan = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(akaneko.nsfw.hentai())
        return message.channel.send(akanekoSan)
    }
}