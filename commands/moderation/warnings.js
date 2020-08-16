const Warns = require("../../models/warns");
const { MessageEmbed } = require("discord.js");
const warns = require("../../models/warns");

module.exports = {
    name: "warnings",
    description: "Sends an embed of the user's total warnings",
    usage: "warnings <@User/ID>",
    accessableby: "Members",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
        let users = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        warns.find({
            guild: message.guild.id,
            user: users.id,
        }, ( err, data ) => {
            if(err) console.log(err);
            if(!data.length) return message.channel.send(`${users.user.tag} Doesn't have any warnings from this guild!`);
            let embed = new MessageEmbed()
            .setColor("RED")
            .setAuthor(`${users.user.tag} warning(s)`)
            .setDescription(data.map((d) => {
                return d.warns.map((w) => `**Moderator |** ${message.guild.members.cache.get(w.admin).user.tag}\n**Reason |** ${w.reason}\n**-------------**`).join("\n")
            }));
            return message.channel.send(embed)
        })
    }
}