const Warns = require("../../models/warns");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "warnings",
    description: "Sends an embed of the user's total warnings",
    usage: "warnings <@User/ID>",
    accessableby: "Members",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
        let users = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        Warns.find({
            guild: message.guild.id,
            user: users.id,
        }, async (err, data) => {
            if(err) console.log(err);
            if(!data.length) return message.channel.send(`${users.tag || users.user.tag} Doesn't have any warnings in this guild.`);
            let embed = new MessageEmbed()
            .setTitle(`${users.user.tag} has ${data.length} total warnings in ${message.guild.name}`)
            .setDescription(data.map(d => {
                return d.warns.map(w => `Admin: ${message.guild.members.cache.get(w.admin).user.tag} Reason: ${w.reason}`).join("\n")
            }))
            message.channel.send(embed);
        })
    }
}