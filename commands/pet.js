const Discord = require("discord.js");
const randompuppy = require("random-puppy");

module.exports.run = async (client, message, args) => {
    const subReddits = ["pet", "pets", "animal"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randompuppy(random);

    const embed = new Discord.MessageEmbed()
    .setTitle(`${random}`)
    .setURL(`http://reddit.com/${random}`)
    .setImage(img)

    message.channel.send(embed)
}

module.exports.config = {
    name: "pet",
    description: "Sends a pet image from Reddit",
    usage: "*pet",
    accessableby: "Members",
    aliases: ["pets", "animal"]
}