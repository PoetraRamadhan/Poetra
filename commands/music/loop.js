const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Loops the current queue",
    usage: "loop",
    accessableby: "Members",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel) {
            embed.setAuthor("Please join a voice channel")
            return message.channel.send(embed)
        }

        const serverQueue = message.client.queue.get(message.guild.id)

        if(!serverQueue) {
            embed.setAuthor("Theres nothing that i can loop.")
            return message.channel.send(embed)
        }

        serverQueue.loop = !serverQueue.loop;

        embed.setDescription(`Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
        embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}