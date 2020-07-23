const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.author;
    let avatar = new Discord.MessageEmbed()
    .setTitle(`${member.tag}`)
    .setDescription(`\`\`Name: ${member.username}\nID: ${member.id}\`\``)
    .setImage(member.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
    message.channel.send(avatar)
}

module.exports.config = {
    name: "avatar",
    description: "Sends the user avatar",
    usage: "*avatar [user]",
    accessableby: "Members",
    aliases: []
}