const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "nowplaying",
    description: "Shows the current playing song",
    usage: "nowplaying",
    accessableby: "Members",
    category: "music",
    aliases: ["np"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!")

        const serverQueue = message.client.queue.get(message.guild.id)
        if(!serverQueue) return message.channel.send("There's nothing playing right now.")

        embed.setDescription(`Now Playing **|** ${serverQueue.songs[0].title}`)
        message.channel.send(embed)
    }
}