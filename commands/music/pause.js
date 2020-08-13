const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "pause",
    description: "Pause the queue",
    usage: "pause",
    accessableby: "Members",
    category: "music",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS);

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing that i can pause.");

        if(serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true)
            
            embed.setDescription("✅ **|** Paused The Current Playing Song")
            return message.channel.send(embed)
        }
    }
}