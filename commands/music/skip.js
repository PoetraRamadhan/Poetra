const { MessageEmbed } = require("discord.js");
const { COLOURS } = require("../../config.json");

module.exports = {
    name: "skip",
    description: "Skips the current song. If theres other user in the voice, it will be a vote!",
    usage: "skip",
    accessableby: "Members",
    category: "music",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You are not in a voice channel!")

        const serverQueue = message.client.queue.get(message.guild.id);
        const vote = message.client.vote.get(message.guild.id);
        if(!serverQueue) return message.channel.send("There's nothing that i can skip.")

        const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2);
        const agree = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1);
        console.log(message.guild.me.voice.channel.members.size);
        if(!message.member.hasPermission("ADMINISTRATOR" || "MANAGE_CHANNELS" || "MANAGE_GUILD")) {
            if(vote.vote > agree) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("Vote - Skip **|** Skipping The Song")
                embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed)
            }

            if(vote.voters.includes(message.author.id)) {
                return message.channel.send("You already voted for skipping this song")
            }

            if(vcvote === 3) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("✔ **|** Skipping The Song")
                embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed);
            }

            vote.vote++
            vote.voters.push(message.author.id);
            return message.channel.send(`You Voted for the Song to Skip, we currently need ${Math.floor(vcvote - vote.vote)} more votes to skip!`);

        }

        serverQueue.connection.dispatcher.end();
        embed.setDescription("✔ **|** Skipping The Song")
        embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
    }
}