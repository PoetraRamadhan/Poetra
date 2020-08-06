const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "np",
    description: "Shows what song currently playing",
    usage: "np",
    accessableby: "Members",
    aliases: ["nowplaying", "now-playing"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel) {
            embed.setAuthor("Please join a voice channel.")
            return message.channel.send(embed)
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) {
            embed.setAuthor("Theres nothing playing.")
            return message.channel.send(embed)
        }

        embed.setDescription(`**NOW PLAYING:** ${serverQueue.songs[0].title}`)
        .setThumbnail(serverQueue.songs[0].thumbnail)
        message.channel.send(embed)
    }
}