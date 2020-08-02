const Discord = require("discord.js");
const moment = require("moment");

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Distrub",
    offline: "Offline/Invisible"
};

module.exports.run = async (client, message, args) => {
    var permissions = []
    var acknowledgements = "None";

    const members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if(message.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Kick Members");
    }
    
    if(message.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban Members");
    }
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrator");
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(message.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Permissions found");
    }

    if(members.user.id == message.guild.ownerID){
        acknowledgements = 'Server Owner';
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${members.user.tag}`, members.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .setThumbnail(members.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .addField("Name:", `${members.user.tag}\n[${members.user.id}]`)
    .addField("Joined At:", `${moment(members.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .addField("Created At:", `${moment(members.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .addField("Permissions:", `${permissions.join(', ')}`)
    .addField(`Roles:`, `[${members.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]\n${members.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
    .addField("Status",`${status[members.user.presence.status]}`)
    .addField("Acknowledgements: ", `${acknowledgements}`)
    .setTimestamp()


    message.channel.send(embed)
}

module.exports.config = {
    name: "userinfo",
    description: "Sends the user's info",
    usage: "*userinfo [Author/User]",
    accessableby: "Members",
    aliases: []
}