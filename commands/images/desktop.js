const { MessageEmbed } = require("discord.js");
const akaneko = require("akaneko");

module.exports = {
    name: "desktop",
    description: "Sends a desktop wallpaper",
    usage: "desktop",
    accessableby: "Members",
    aliases: ["dwallpaper"],
    category: "images",
    run: async (client, message, args) => {
        const akanekoSan = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(akaneko.wallpapers())
        message.channel.send(akanekoSan).then(embed => {
            embed.react("❤"),
            embed.react("💔")
        })
    }
}