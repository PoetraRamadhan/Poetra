const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skips the current song",
    usage: "skip",
    accessableby: "Members",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel) {
            embed.setAuthor("Please join a vocie channel.")
            return message.channel.send(embed)
        };

        const serverQueue = message.client.queue.get(message.guild.id);
        const vote = message.client.vote.get(message.guild.id);

        if(!serverQueue) {
            embed.setAuthor("Theres nothing that i could skip.")
            return message.channel.send(embed)
        };

        const vcVote = Math.floor(message.guild.me.voice.channel.members.size / 2);
        const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
        console.log(message.guild.me.voice.channel.members.size)
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            if(vote.vote > okie) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("VOTE - SKIP | Skipping The Song")
                embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed)
            }

            if(vote.voters.include(message.author.id)) {
                return message.reply("You already voted for skipping this song")
            }

            if(vcVote === 2) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("Skipping The Song")
                embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed);
            }

            vote.vote++
            vote.voters.push(message.author.id);
            return message.channel.send(`You Voted for the Song to Skip, btw we currently need ${Math.floor(vcvote - vote.vote)} votes`)
        }

        serverQueue.connection.dispatcher.end();
        embed.setDescription("Skipping The Song")
        embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
    }
}