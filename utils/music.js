const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const { QUEUE_LIMIT, COLOURS } = require("../config.json");

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        if(!song) {
            setTimeout(() => {
                queue.channel.leave();
                message.client.queue.delete(message.guild.id);
                embed.setAuthor("Thank you for tuning with me 🎶")
                return queue.textChannel
                .send(embed)
                .catch(console.error);
            }, 30000);
        }

        try {
            var stream = await ytdlDiscord(song.url, {
                highWaterMark: 1 << 25
            });
        } catch (err) {
            if(queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            if(error.message.includes === "copyright") {
                return message.channel.send("Sorry, but sadly this content contains CopyRight")
            } else {
                console.log(err)
            }
        }

        const dispatcher = queue.connection
        .play(stream, { type: "opus" })
        .on("finish", () => {
            if(queue.loop) {
                let lastsong = queue.songs.shift();
                queue.songs.push(lastsong);
                module.exports.play(queue.songs[0], message);
            } else {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
        })
        .on("error", console.error);

        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        embed.setAuthor(`Playing Song:`, message.client.user.displayAvatarURL())
        embed.setDescription(`**[${song.title}](${song.url})**`)

        queue.textChannel
        .send(embed)
        .catch(err => console.log(err));
    }
}