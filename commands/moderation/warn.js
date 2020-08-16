const Warns = require("../../models/warns");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "warn",
    description: "Warns a user",
    usage: "warn <@User/ID> <Reason>",
    accessableby: "Admins",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permission to use this command!")
        let users = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!users) return message.channel.send("Coulnd't find User, Please provide a User or UserID.");
        if(users.id === message.author.id) return message.channel.send("You cannot warn yourself.")
        if(!args.slice(1).join(" ")) return message.channel.send("Please provide a reason.")

        Warns.findOne({
            guild: message.guild.id,
            user: users.id,
        }, async (err, data) => {
            if(err) console.log(err);
            if(!data) {
                let newWarns = new Warns({
                    guild: message.guild.id,
                    user: users.id,
                    warns:[{
                        admin: message.author.id,
                        reason: args.slice(1).join(" "),
                    }]
                })
                newWarns.save()
                embed.setAuthor(`${users.user.tag} Has been warned`)
                embed.setDescription(`**Reason:** ${args.slice(1).join(" ")}`)
                message.channel.send(embed)
            } else {
                data.warns.unshift({
                    admin: message.author.id,
                    reason: args.slice(1).join(" "),
                })
                data.save()
                embed.setAuthor(`${users.user.tag} Has been warned`)
                embed.setDescription(`**Reason:** ${args.slice(1).join(" ")}\n**Total:** ${data.warns.length} Warning(s)`)
                message.channel.send(embed)
            }
        })
    }
}