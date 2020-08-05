const Discord = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");

module.exports = {
    name: "help",
    description: "Sends the information of all commands",
    usage: "*help/*help <CommandName>",
    accessableby: "Members",
    aliases: [],
    category: "utilities",
    run: async (client, message, args) => {
        const settings = await Guild.findOne({
            guildID: message.guild.id,
        }, (err, guild) => {
            if(err) console.log(err);
    
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                });
    
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
    
                message.channel.send(`This server wasn't in our database! but we've added it, Please re-type the command.`).then(m => m.delete({ timeout: 10000 }));
            }
        });
        let prefix = settings.prefix;

        let helpArray = message.content.split(" ");
        let helpArgs = helpArray.slice(1);
    
        if(!helpArgs[0]) {
            let helpEmbed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL())
            .setDescription(`For more information use the command \`${prefix}help <command>\`\nInvite me using the command \`${prefix}invite\``)
            .addField("🛡️__Moderation__🛡️", "`ban | kick | unban | clear`")
            .addField("📜__Information__📜", "`info | serverinfo | userinfo | avatar`")
            .addField("🔧__Utilities__🔧", "`ping | help | invite`")
            .addField("⚙️__Configuration__⚙️", "`setprefix`")
            .addField("😂__Fun__😂", "`howgay | howcool | meme | pet | quiz | 8ball`")
            .setFooter(`My prefix is: ${prefix}`, client.user.displayAvatarURL())
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