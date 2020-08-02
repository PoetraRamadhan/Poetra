const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send("<:Fail:739301997575929976>|You do not have the permission to use this command");
    }

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(!target) {
        return message.channel.send("<:Fail:739301997575929976>|Coulnd't find User, Please provide a User or UserID");
    }

    if(target.id === message.author.id) {
        return message.channel.send("<:Fail:739301997575929976>|You cannot ban yourself.");
    }

    if(target.id === message.guild.owner.id) {
        return message.channel.send("<:Fail:739301997575929976>|You cannot ban the guild owner.");
    }

    if(!target.bannable) {
        return message.channel.send("<:Fail:739301997575929976>|Coulnd't ban this member. Maybe his/her role is higher than me?")
    }


    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provided."

    try {
        target.ban(reason);
        message.channel.send(`<:Success:739301940705624135>|Successfuly Banned ${target.user.tag}`).then(m => m.delete({ timeout: 20000 }))
    } catch (err) {
        if(err) console.log(err);
    }
}

module.exports.config = {
    name: "ban",
    description: "Ban a member from the guild",
    usage: "*ban <@User/ID> [reason]",
    accessableby: "Staff",
    aliases: []
}