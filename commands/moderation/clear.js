const Discord = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clears out the message from 1 up to 100",
    usage: "clear <Amount>",
    accessableby: "Admins",
    aliases: ["purge", "clean"],
    category: "moderation",
    run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Missing Permissions!").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("This is not a number").then(m => m.delete(5000));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.reply(`Something went wrong... ${err}`));

    message.channel.send(`Deleted ${deleteAmount} Messages`).then(m => m.delete({ timeout: 5000}))
    }
}