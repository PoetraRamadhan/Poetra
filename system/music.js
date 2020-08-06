const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const { QUEUE_LIMIT, YT_API_KEY } = require("../config.json");

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        let embed = new MessageEmbed()
        .setColor("RANDOM");

        if(!song) {
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            embed.setAuthor("Music has been Ended!")
            return queue.textChannel
            .send(embed)
            .catch(e => console.log(e));
        }

        try {
            var stream = await ytdlDiscord(song.url, {
                highWaterMark: 1 << 25,
            });
        } catch (error) {
            if(queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            if(error.message.includes === "copyright"){
                return message.channel.send("This content contains CopyRight.")
            } else {
                console.log(error);
            }
        }

        const dispatcher = queue.connection
        .play(stream, { type: "opus" })
        .on("finish", () => {
            if(queue.loop){
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
        embed.setAuthor("Started playing song", message.client.user.displayAvatarURL({ dynamic: true, format: "png" }))
        embed.setDescription(`**[${song.title}](${song.url})**`)
        embed.setImage(song.thumbnail)

        queue.textChannel
        .send(embed)
        .catch(err => console.log(err));
    }
}