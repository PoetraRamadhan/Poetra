const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stops the music",
    usage: "stop",
    accessableby: "Members",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel) {
            embed.setAuthor("Please join a voice channel.")
            return message.channel.send(embed)
        };

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue) {
            embed.setAuthor("Theres nothing playing.");
            return message.channel.send(embed)
        };

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}