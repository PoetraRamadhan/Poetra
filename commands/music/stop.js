const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "stop",
    description: "Stops the music",
    usage: "stop",
    accessableby: "Members",
    categpry: "music",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing playing right now");

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}