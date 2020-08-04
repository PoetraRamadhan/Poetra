const Discord = require("discord.js");
const { description } = require("./8ball");

module.exports = {
    name: "quiz",
    description: "Sends out a random quiz",
    usage: "*quiz",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        const quiz = require("../../quiz.json");
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answers => answers.toLowerCase() === response.content.toLowerCase());
        }
    
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
            .then(collected => {
                message.channel.send(`${collected.first().author} Got the answer, Congrats!`);
            })
            .catch(collected => {
                message.channel.send("Looks like nobody answer it.")
            })
        })
    }
}