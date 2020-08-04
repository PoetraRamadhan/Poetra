const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Sends the user avatar",
    usage: "*avatar [@User/ID/Author]",
    accessableby: "Members",
    aliases: [],
    category: "information",
    run: async (client, message, args) => {
    // Setting Const
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const member = message.guild.member(user)
  
    // Avatar Command
    const avaembed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag}`)
    .setDescription(`\`\`Name: ${member.user.username}\nID: ${member.user.id}\`\``)
    .setImage(`${member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
  
    message.channel.send(avaembed)
    }
}