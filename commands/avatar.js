const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let avatar = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag}`)
    .setDescription(`\`\`Name: ${member.user.username}\nID: ${member.id}\`\``)
    .setImage(member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
    message.channel.send(avatar)
}

module.exports.config = {
    name: "avatar",
    description: "Sends the user avatar",
    usage: "*avatar [user]",
    accessableby: "Members",
    aliases: []
}