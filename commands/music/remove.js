const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "remove",
    description: "Remove the song that is in the queue",
    usage: "remove",
    accessableby: "Members",
    category: "music",
    aliases: ["r"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!")

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing that i can remove.");

        if(isNaN(args[0])) return message.channel.send("Please input numbers only!")
        if(args[0] > serverQueue.songs.length) return message.channel.send("Unable to find this song in queue");

        serverQueue.songs.splice(args[0] - 1, 1);
        embed.setDescription("Removed from queue")
        return message.channel.send(embed);
    }
}