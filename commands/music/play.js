const { Util } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const { YT_API_KEY } = require("../../config.json")
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(YT_API_KEY);

module.exports = {
    name: "play",
    description: "Play a song",
    usage: "play <URL/Title>",
    accessableby: "Members",
    aliases: [],
    category: "music",
    run: async (client, message, args) => {
        const searchString = args.slice(1).join(" ");
        const url = args[1] ? args[1].replace(/(._)/g, "$1") : ""
        const serverQueue = message.client.queue.get(message.guild.id);

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Please join a voice channel!")
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT")) return message.channel.send("I do not have the permission to join your voice channel!");
        if(!permissions.has("SPEAK")) return message.channel.send("I do not have the permission to speak in your voice channel!");

        try {
            var video = await youtube.getVideoByID(url);
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 1);
                var video = await youtube.getVideoByID(videos[0].id);
            } catch (err) {
                console.log(err)
                message.channel.send("Couldn't obtain content.")
            }
        }

        const song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            thumbnail: video.thumbnails[3],
        };

        if(!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            }
            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[1])
            } catch (err) {
                console.log(err);
                message.client.queue.delete(message.guild.id);
                return message.channel.send(`There was a problem on the system: ${err}`);
            }
        
        } else {
            serverQueue.songs.push(song);
            let embed = new MessageEmbed()
            .setAuthor(`(${song.title})[${song.url}]`)
            .setImage(song.thumbnail)
            return message.channel.send(embed)
        }

        function play(guild, song) {
            const serverQueue = message.client.queue.get(guild.id);
            if(!song) {
                message.client.queue.delete(guild.id)
                setTimeout(() => {
                    serverQueue.voiceChannel.leave()
                    message.channel.send("Thank you for tuning with me!")
                    return;
                }, 30000);
            }

            const dispatcher = serverQueue.connection.play(ytdl(song))
            .on("finish", () => {
                serverQueue.song.push()
                play(guild, serverQueue.songs[1])
            })
            .on("error", (error) => {
                console.log(error)
            })

            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        }
    }
}