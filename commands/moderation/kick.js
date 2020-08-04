const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a member from the guild",
    usage: "*kick <@User/ID> [reason]",
    accessableby: "Admins",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("<:Fail:739301997575929976>|You do not have the permission to use this command");
        }
    
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
        if(!target) {
            return message.channel.send("<:Fail:739301997575929976>|Coulnd't find User, Please provide a User or UserID");
        }
    
        if(target.id === message.author.id) {
            return message.channel.send("<:Fail:739301997575929976>|You cannot kick yourself.");
        }
    
        if(target.id === message.guild.owner.id) {
            return message.channel.send("<:Fail:739301997575929976>|You cannot kick the guild owner.");
        }
    
        if(!target.kickable) {
            return message.channel.send("<:Fail:739301997575929976>|Coulnd't kick this member. Maybe his/her role is higher than me?")
        }
    
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason provided."
    
        try {
            target.kick(reason);
            message.channel.send(`<:Success:739301940705624135>|Successfully Kicked ${target.user.tag}`).then(m => m.delete({ timeout: 20000 }))
        } catch (err) {
            if(err) console.log(err);
        }
    }
}