const Discord = require("discord.js");
const randompuppy = require("random-puppy");

module.exports = {
    name: "pet",
    description: "Sends a pet image from Reddit",
    usage: "pet",
    accessableby: "Members",
    aliases: ["pets"],
    category: "fun",
    run: async (cient, message, args) => {
        const subReddits = ["pet", "pets"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randompuppy(random);
    
        const embed = new Discord.MessageEmbed()
        .setTitle(`${random}`)
        .setURL(`http://reddit.com/${random}`)
        .setImage(img)
    
        message.channel.send(embed)
    }
}