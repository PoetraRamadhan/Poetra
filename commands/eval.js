const Discord = require("discord.js");
const settings = require("../botSettings.json");

module.exports.run = async (client, message, args) => {
    if(!message.author.id === "728587451437940766") return message.channel.send("Only the creator of this bot can use this.")
    let code = args.slice(0).join(" ")

    try {
        let evaluate = require("util").inspect(eval(code));
        if(evaluate.length > 1950) {
            evaluate = evaluate.substr(0, 1950)
        }

        let token = settings.token.replace(/\./g, "\.");
        let re = new RegExp(token, "g");
        evaluate = evaluate.replace(re, "*R-eD-Ac-Te-D-*");
        let embed = new Discord.MessageEmbed()
        .addField(`Input`, "```js\n"+code+"```")
        .addField(`Output`, "```js\n"+evaluate+"```")
        message.channel.send(embed)
    } catch (error) {
        console.log(error);
    }
}

module.exports.config = {
    name: "eval",
    description: "Evaluate a code",
    usage: "*eval <code>",
    accessableby: "Creator",
    aliases: []
}