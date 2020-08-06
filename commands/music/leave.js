const { MesageEmbed, MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    descripiton: "Leaves the voice channel",
    usage: "leave",
    accessableby: "Members",
    aliases: ["dc", "disconnect"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel) {
            embed.setAuthor("Join my channel to disconnect me")
            return message.channel.send(embed)
        }

        embed.setAuthor("Thank you for using me!")
        channel.leave();
        return message.channel.send(embed)
    }
}