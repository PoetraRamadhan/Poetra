const Warns = require("../../models/warns");

module.exports = {
    name: "warn",
    description: "Warns a user",
    usage: "warn <@User/ID> <Reason>",
    accessableby: "Admins",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
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
                message.channel.send(`**${users.user.tag}** has been warned with the reason of **${args.slice(1).join(" ")}**`)
            } else {
                data.warns.unshift({
                    admin: message.author.id,
                    reason: args.slice(1).join(" "),
                })
                data.save()
                message.channel.send(`**${users.user.tag}** has been warned with the reason of **${args.slice(1).join(" ")}**, Total Warns: **${data.warns.length}** Warnings`)
            }
        })
    }
}