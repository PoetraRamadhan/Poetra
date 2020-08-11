const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "maid",
    description: "Sends lewd maid images. i wish i have a maid",
    usage: "maid",
    accessableby: "Members",
    aliases: [],
    category: "maid",
    run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("Please use this command in a NSFW channel");
        const akanekoSan = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(akaneko.nsfw.maid())
        return message.channel.send(akanekoSan)
    }
}