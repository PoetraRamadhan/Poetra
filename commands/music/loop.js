const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "loop",
    description: "Loop the queue",
    usage: "loop",
    accessableby: "Members",
    category: "music",
    aliases: [],
    run: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setColor(COLOURS);

    const { channel } = message.member.voice;
    if(!channel) return message.channel.send("You are not in a voice channel!");

    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.channel.send("There is nothing that i can loop.");
    
    serverQueue.loop = !serverQueue.loop;
    
    embed.setDescription(`Looping **|** **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
    message.channel.send(embed)
    }
}