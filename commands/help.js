const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(!helpArgs[0]) {
        let helpEmbed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL())
        .setDescription(`For more information use the command \`*help <command>\`\nInvite me using the command \`*invite\``)
        .addField("Moderation", "`ban,kick,unban,clear`")
        .addField("Information", "`info,serverinfo,userinfo,avatar`")
        .addField("Utilities", "`ping`")
        .addField("Fun", "`howgay`")
        .setFooter("My prefix is: *")
        .setColor("PURPLE")

        message.channel.send(helpEmbed)
    }

    if(helpArgs[0]) {
        let command = helpArgs[0];

        if(client.commands.has(command)) {

        command = client.commands.get(command);
        let descEmbed = new Discord.MessageEmbed()
        .setAuthor(`${command.config.name} Command`)
        .addField(`**Command's Description**`, `__${command.config.description || "No Description"}__`)
        .addField(`**Command's Usage**`, `__${command.config.usage || "No Usage"}__`)
        .addField(`**Command's Permission**`, `__${command.config.accessableby || "Members"}__`)
        .addField(`**Command's Aliases**`, `__${command.config.aliases || "No Aliases"}__`)
        .setColor("PURPLE")

        message.channel.send(descEmbed)
        }
    }
}

module.exports.config = {
    name: "help",
    description: "Sends the information of all commands",
    usage: "*help / *help <command>",
    accessableby: "Members",
    aliases: []
}