const Discord = require("discord.js");
const moment = require("moment");

const status = {
    online: "<:Online:739302910932025474>Online",
    idle: "<:Idle:739302949532205146>Idle",
    dnd: "<:DND:739302986915774494>Do Not Distrub",
    offline: "<:Invisible:739303023976775710>Offline/Invisible"
};

module.exports.run = async (client, message, args) => {
    const members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${members.user.tag}`, members.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .setThumbnail(members.user.displayAvatarURL({ dynamic: true, format: "png" }))
    .addField("📛|Name", `${members.user.tag}\n[${members.user.id}]`)
    .addField("📅|Joined At", `${moment(members.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .addField("📅|Created At", `${moment(members.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .addField(`⭐|Roles`, `${members.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}\n[${members.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`)
    .addField("🌀|Status",`${status[members.user.presence.status]}`)
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