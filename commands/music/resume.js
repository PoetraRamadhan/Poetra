const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "resume",
    description: "resume the queue",
    usage: "resume",
    accessableby: "Members",
    category: "music",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS);

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing that i can resume.");

        if(serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume()
            embed.setAuthor("✅ **|** Resumed the Paused Song")
            return message.channel.send(embed)
       }
    }
}