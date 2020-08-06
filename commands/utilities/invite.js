const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Send an embed that will redirect you to invite the bot",
    usage: "invite",
    accessableby: "Members",
    aliases: [],
    category: "utilities",
    run: async (client, message, args) => {
        let inviteEmbed = new Discord.MessageEmbed()
        .setTitle("Invite Me!")
        .setColor("BLUE")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=734688939146870794&scope=bot&permissions=805314622")
    
        message.channel.send(inviteEmbed)
    }
}
