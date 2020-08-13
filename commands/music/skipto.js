const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "skipto",
    description: "Skip to the song that is in the queue",
    usage: "skipto <Number>",
    accessableby: "Members",
    categpry: "music",
    aliases: ["jump"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!")

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing that i can skip.");

        if(!args[0]) return message.channel.send(`Please give the song queue number!`);
        if(isNaN(args[0])) return message.channel.send("Please input numbers only!");
        if(serverQueue.songs.length < args[0]) return message.channel.send("Unable to find this song in queue");
        serverQueue.songs.splice(0, Math.floor(args[0] - 1));
        serverQueue.connection.dispatcher.end();
            
        embed.setDescription(`Skipped To ${args[0]}`)
        message.channel.send(embed);
    }
}