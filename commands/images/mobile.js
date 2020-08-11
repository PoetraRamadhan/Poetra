const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "mobile",
    description: "Sends a mobile wallpaper",
    usage: "mobile",
    accessableby: "Members",
    aliases: ["mwallpaper"],
    category: "images",
    run: async (client, message, args) => {
        const akanekoSan = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(akaneko.mobileWallpapers())
        return message.channel.send(akanekoSan).then(embed => {
            embed.react("❤"),
            embed.react("💔")
        })
    }
}