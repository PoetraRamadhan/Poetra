const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You do not have the permission to use this command");
    }

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!target) {
        return message.reply("Coulnd't find User, Please provide a User or UserID");
    }

    if(target.id === message.author.id) {
        return message.reply("You cannot kick yourself.");
    }

    if(target.id === message.guild.owner.id) {
        return message.reply("You cannot kick the guild owner.");
    }

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provided."

    try {
        target.kick(reason);
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Successfully kicked ${target.user.tag}`, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqiK692F33PbCxxcrJjTaHmIk68heDGtXbJA&usqp=CAU")
        .setColor("BLUE")
        message.channel.send(embed)
    } catch (err) {
        if(err) console.log(err);
    }
}

module.exports.config = {
    name: "kick",
    description: "Kicks a member from the guild",
    usage: "*kick <@User/ID> [reason]",
    accessableby: "Staff",
    aliases: []
}