const mongoose = require("mongoose");
const Guild = require("../models/guild");

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

    if(message.mentions.users.size){
		if(message.mentions.users.first().id == client.user.id){
			return message.reply(`My Prefix Is: \`\`${prefix}\`\``)
		}
	}

    if(message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command)
        command.run(client, message, args);
};