const Discord = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clears out the message from 1 up to 100",
    usage: "*clear <Amount>",
    accessableby: "Admins",
    aliases: ["purge", "clean"],
    category: "moderation",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("<:Fail:739301997575929976>|You do not have the permission to use this command.").then(m => m.delete(5000));
        }
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("<:Fail:739301997575929976>|Please input a number.");
        }
    
        let deleteAmount;
        if (parseInt(args[0]) >= 100) {
            return message.reply("<:Fail:739301997575929976>|You can only delete up to 100 messages at a time")
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.send(`<:Success:739301940705624135>|Successfully Cleared ${deleteAmount} Messages`).then(m => m.delete({ timeout: 20000 }))
    }
}