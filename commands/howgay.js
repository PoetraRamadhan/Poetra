const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Gayness`, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDixa2k3Uy5ErFS4O0KZzTvmosdL6bbZgLDg&usqp=CAU")
    .addField("Howgay?", `${members} Is ${randomNumber}% Gay`)

    message.channel.send(embed)

}

module.exports.config = {
    name: "howgay",
    description: "Shows howgay the user/author is",
    usage: "*howgay [user/ID]",
    accessableby: "Members",
    aliases: []
}