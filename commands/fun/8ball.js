const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Asks the ball some questions and it will answer",
    usage: "8ball <questions>",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        const question = args.slice(0).join(" ");
        if(!question) return message.channel.send("That is not a question but this is an answer.")
        const answer = [`Yes, ${message.author}`, `Maybe, ${message.author}`, `I don't know, ${message.author}`, `Probably, ${message.author}`, `Totally no, ${message.author}`];
        const randomAns = answer[Math.floor(Math.random() * answer.length)];
    
        message.channel.send(randomAns)
    }
}