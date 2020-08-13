const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "volume",
    description: "Manage the vplume of the guild music",
    usage: "volume <Number>",
    accessableby: "Members",
    category: "music",
    aliases: ["vol"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR" || "MANAGE_GUILD")) {
            return message.channel.send("You do not have the permission to use this command!")
        }

        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!args[0]) return message.channel.send(`The current volume is ${serverQueue.volume}`);
        if(isNaN(args[0])) return message.channel.send("Please input numbers only");
        if(args[0] > 200) return message.channel.send("We don't want to destroy our ears don't we")

        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
        embed.setDescription(`Managed the volume to ${args[0]}`)
        message.channel.send(embed)
    }
}