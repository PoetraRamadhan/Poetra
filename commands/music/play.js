const { MessageEmbed, Util } = require("discord.js");
const { YT_API_KEY, QUEUE_LIMIT, COLOURS } = require("../../config.json");
const { play } = require("../../utils/music");
const ms = require("ms");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(YT_API_KEY);

module.exports = {
    name: "play",
    description: "play a music",
    usage: "play <URL/LINK>",
    accessableby: "Members",
    category: "music",
    aliases: ["p"],
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor(COLOURS)

        if(!args.length) return message.channel.send("Please put a a valid syntax: URL or Title!")

        const { channel } = message.member.voice;
        const textChannel = message.channel;
        if(!channel) return message.channel.send("You are not in a voice channel!");

        const targetSong = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const urlcheck = videoPattern.test(args[0]);
        if(!videoPattern.test(args[0]) && playlistPattern.test(args[0])) return message.channel.send("Sorry, i can't play the playlist for now.");

        const serverQueue = message.client.queue.get(message.guild.id);

        const queueConstruct = {
            textChannel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true,
        }
        const voteConstruct = {
            vote: 0,
            voters: [],
        }

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
            } catch (error) {
                if(message.includes === "copyright") {
                    return message
                    .reply("Sorry, but this content contains copyright")
                    .catch(console.error);
                } else {
                    console.error(error);
                }
            }
        } else {
            try {
                const result = await youtube.searchVideos(targetSong, 1);
                songData = await ytdl.getInfo(result[0].url);
                song = {
                    title: songData.videoDetails.title,
                    url: songData.videoDetails.video_url,
                    duration: songData.videoDetails.lengthSeconds,
                    thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
                  };
            } catch (error) {
                console.log(error);
                if(error.errors[0].domain === "usageLimits") {
                    return message.channel.send("The YT API Limit is over, The Dev will restore it shortly")
                }
            }
        }

        if(serverQueue) {
            if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
                return message.channel.send(`You have reach the Queue limits of: ${QUEUE_LIMIT}`)
            }

            serverQueue.songs.push(song);
            embed.setAuthor("Added to queue!", client.user.displayAvatarURL())
            embed.setDescription(`**[${song.title}](${song.url})**`)
            embed.setImage(song.thumbnail)
            embed.setFooter(`👍 ${songData.videoDetails.likes} 👎 ${songData.videoDetails.dislikes}`)
            
            return serverQueue.textChannel
            .send(embed)
            .catch(console.error);
        } else {
            queueConstruct.songs.push(song);
        }

        if(!serverQueue) 
        message.client.queue.set(message.guild.id, queueConstruct);
        message.client.vote.set(message.guild.id, voteConstruct);
        
        if(!serverQueue) {
            try {
                queueConstruct.connection = await channel.join();
                play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(`Cannot join voice channel because of: ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel
                .send(`Cannot join voice channel because of: ${error}`)
                .catch(console.error);
            }
        }
    }
}