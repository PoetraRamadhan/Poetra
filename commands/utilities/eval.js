const Discord = require("discord.js");
const settings = process.env.TOKEN;

module.exports = {
    name: "eval",
    description: "Evaluate a code",
    usage: "eval <Code>",
    accessableby: "Creator",
    aliases: [],
    category: "utilities",
    run: async (client, message, args) => {
        if(message.author.id !== "728587451437940766") return message.channel.send("Only the creator of this bot can use this.")
        let code = args.slice(0).join(" ")
    
        try {
            let evaluate = require("util").inspect(eval(code));
            if(evaluate.length > 1950) {
                evaluate = evaluate.substr(0, 1950)
            }
    
            let token = settings.token.replace(/\./g, "\.");
            let re = new RegExp(token, "g");
            evaluate = evaluate.replace(re, "*R-eD-Ac-Te-D-*");
            message.channel.send("**INPUT:**\n```js\n"+code+"```\n**OUTPUT:**\n```js\n"+evaluate+"```")
        } catch (error) {
            message.channel.send("**ERROR:**\n```js\n"+error+"```")
        }
    }
}