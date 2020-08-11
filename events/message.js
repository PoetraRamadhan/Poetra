const Discord = require("discord.js");
const ms = require("ms");
const mongoose = require("mongoose");
const Guild = require("../models/guild");
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
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

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        return message.channel.send(`My Prefix Is: \`${prefix}\``)
    };

    if(message.content.indexOf(prefix) !== 0) return;

    if(message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`This command is on a cooldown, please try again in **${timeLeft.toFixed(1)} Seconds**`)
        }
    } else if(command) command.run(client, message, args)

    timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
};