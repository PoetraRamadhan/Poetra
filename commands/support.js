const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const dmReciever = message.author;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.tag}'s Supports Info`, client.user.displayAvatarURL())
    .addField("Official Server | Creator", `[Official Server](https://invite.gg/uniquestars) | <@728587451437940766>`)
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp()

    dmReciever.send(embed)
    message.channel.send("Open your Dms!\nIf there are no DM from me please enable [ALLOW DIRECT MESSAGES FROM MEMBERS]")
}

module.exports.config = {
    name: "support",
    description: "Sends an embed where you can get support of the bot",
    usage: "*support",
    accessableby: "Members",
    aliases: []
}