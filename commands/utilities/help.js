const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Sends the information of all commands",
    usage: "*help/*help <CommandName>",
    accessableby: "Members",
    aliases: [],
    category: "utilities",
    run: async (client, message, args) => {
        let helpArray = message.content.split(" ");
        let helpArgs = helpArray.slice(1);
    
        if(!helpArgs[0]) {
            let helpEmbed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL())
            .setDescription(`For more information use the command \`*help <command>\`\nInvite me using the command \`*invite\``)
            .addField("🛡️__Moderation__🛡️", "`ban | kick | unban | clear`")
            .addField("📜__Information__📜", "`info | serverinfo | userinfo | avatar`")
            .addField("🔧__Utilities__🔧", "`ping | help | invite`")
            .addField("😂__Fun__😂", "`howgay | howcool | meme | pet | quiz | 8ball`")
            .setFooter("My prefix is: *", client.user.displayAvatarURL())
            .setColor("PURPLE")
    
            message.channel.send(helpEmbed)
        }
    
        if(helpArgs[0]) {
            let command = helpArgs[0];
    
            if(client.commands.has(command)) {
    
            command = client.commands.get(command);
            let descEmbed = new Discord.MessageEmbed()
            .setAuthor(`${command.name} Command`)
            .addField(`**Command's Description**`, `__${command.description || "No Description"}__`)
            .addField(`**Command's Usage**`, `__${command.usage || "No Usage"}__`)
            .addField(`**Command's Permission**`, `__${command.accessableby || "Members"}__`)
            .addField(`**Command's Aliases**`, `__${command.aliases || "No Aliases"}__`)
            .addField(`**Command's Category**`, `__${command.category || "No Category"}__`)
            .setColor("PURPLE")
    
            message.channel.send(descEmbed)
            }
        }
    }
}