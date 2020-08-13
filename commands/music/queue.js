const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "queue",
    description: "Sends the queue list",
    usage: "queue",
    accessableby: "Members",
    category: "music",
    aliases: ["q"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing playing right now.");

        embed.setDescription(`${serverQueue.songs
            .map((song, index) => index + 1 + ". " + `[${song.title}](${song.url})`)
            .join("\n\n")}`,
            { split: true }
        );
        embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}