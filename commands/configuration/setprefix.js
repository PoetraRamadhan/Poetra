const mongoose = require("mongoose");
const Guild = require("../../models/guild");

module.exports = {
    name: "setprefix",
    description: "Sets a costum prefix for the guild",
    usage: "*setprefix <Prefix>",
    accessableby: "Admins",
    aliases: ["set-prefix"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send("You do not have the permission to use this command.").then(m => m.delete({ timeout: 10000}))
        };

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

        if(args.length < 1){
            return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``).then(m => m.delete({timeout: 10000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
    }
}
