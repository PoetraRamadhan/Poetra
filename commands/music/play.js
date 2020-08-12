const { MessageEmbed, Util } = require("discord.js");
const { YT_API_KEY, QUEUE_LIMIT, COLOURS } = require("../../config.json");
const { play } = require("../../utils/music");
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
        
    }
}