const Discord = require("discord.js");

module.exports = {
    name: "howcool",
    description: "Sends you the persentage of howcool is a user",
    usage: "*howcool [@User/ID]",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        const members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        const random = Math.floor(Math.random() * 100) + 1;
    
        const embed = new Discord.MessageEmbed()
        .setAuthor("HowCool Generator", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJcB7Tu8J3OxQJbYSFzc5sCtehTD3Ea2ZVkg&usqp=CAU")
        .setDescription(`${members} Is ${random}% Cool!`)
    
        message.channel.send(embed)
    }
}