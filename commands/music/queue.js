const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Shows the current queue",
    usage: "queue",
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
            embed.setAuthor("Theres nothing in the queue")
            return message.channel.send(embed)
        } else {
            embed.setDescription(
                `${serverQueue.songs
                .map((song, index) => index + 1 + "." + song.title)
                .join("\n\n")}`,
                { split: true}
            )
            embed.setThumbnail(client.user.displayAvatarURL())

            return message.channel.send(embed)
        }
    }
}