const { MessageEmbed, Util } = require("discord.js");
const ms = require("ms");
const ytdl = require("ytdl-core");
const { QUEUE_LIMIT, YT_API_KEY } = require("../../config.json");
const YoutubeApi = require("simple-youtube-api");
const youtube = new YoutubeApi(YT_API_KEY);
const { play } = require("../../system/music");
const error = require("../../events/error");


module.exports = {
    name: "play",
    description: "Play a song",
    usage: "play <URL/Title>",
    accessableby: "Members",
    aliases: [],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        const { channel } = message.member.voice;

        if(!channel){
            embed.setAuthor("Please join a voice channel.")
            return message.channel.send(embed)
        };

        if(!args.length){
            embed.setAuthor("Wrong Syntax: please put an URL or title of the content.")
            return message.channel.send(embed)
        };

        const targetsong = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const urlcheck = videoPattern.test(args[0]);

        if(!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
            embed.setAuthor("Unable to play the playlist for now.")
            return message.channel.send(embed)
        };

        const serverQueue = message.client.queue.get(message.guild.id);

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true,
        };

        const voteConstruct = {
            vote: 0,
            voters: [],
        };

        let songData = null;
        let song = null;

        if(urlcheck) {
            try {
                songData = await ytdl.getInfo(args[0]);

                song = {
                    title: songData.videoDetails.title,
                    url: songData.videoDetails.video_url,
                    duration: songData.videoDetails.lengthSeconds,
                    thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
                };
            } catch (e) {
                if(message.include === "copyright") {
                    return message
                    .reply("This content contains CopyRight")
                    .catch(console.error)
                } else {
                    console.log(e);
                }
            }
        } else {
            try {
                const result = await youtube.searchVideos(targetsong, 1);
                songData = await ytdl.getInfo(result[0].url);

                song = {
                    title: songData.videoDetails.title,
                    url: songData.videoDetails.video_url,
                    duration: songData.videoDetails.lengthSeconds,
                    thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
                };
            } catch (e) {
                console.log(e);
                if(error.errors[0].domain === "usageLimits") {
                    return message.channel.send("YT API has reached its limit, it will be restored eventually.")
                }
            }
        }

        if(serverQueue) {
            if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
                return message.channel.send(`You can not add songs more than ${QUEUE_LIMIT} in queue.`)
            }
            
            serverQueue.songs.push(song);
            embed.setAuthor("Added New Song To Queue", client.user.displayAvatarURL())
            embed.setDescription(`**[${song.title}]**`)
            embed.setImage(song.thumbnail)
            .setFooter("Likes - " + songData.videoDetails.likes + ", Dislikes - " +  songData.videoDetails.dislikes)
            
            return serverQueue.textChannel
              .send(embed)
              .catch(console.error);

        } else {
            queueConstruct.songs.push(song);
        }

        if(!serverQueue) {
            message.client.queue.set(message.guild.id, queueConstruct);
            message.client.vote.set(message.guild.id, voteConstruct);
        }
        if(!serverQueue) {
            try {
                queueConstruct.connection = await channel.join();
                play(queueConstruct.songs[0], message);
            } catch (e) {
                console.error(`Could not join a voice channel: ${e}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel
                .send({
                    embed: {
                        description: "Could not join voice channel",
                        color: "RED",
                    }
                })
                .catch(e => console.log(e));
            }
        }
    }
}