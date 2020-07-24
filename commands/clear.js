const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Missing Permissions!").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("Please input a number.");
    }

    let deleteAmount;
    if (parseInt(args[0]) >= 100) {
        return message.reply("You can only delete up to 100 messages at a time")
    } else {
        deleteAmount = parseInt(args[0]);
    }
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Successfully Cleared ${deleteAmount} Messages`, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqiK692F33PbCxxcrJjTaHmIk68heDGtXbJA&usqp=CAU")
    .setColor("BLUE")

    message.channel.bulkDelete(deleteAmount + 1, true)
    .catch(err => message.reply(`ERROR:\n\`\`\`${err}\`\`\``));
    message.channel.send(embed)
}

module.exports.config = {
    name: "clear",
    description: "Clears out the message from 1 up to 100",
    usage: "*clear <amount>",
    accessableby: "Staff",
    aliases: ["purge", "clean"]
}