const Discord = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unbans a member from the Guild",
    usage: "unban <ID> [reason]",
    accessableby: "Admins",
    aliases: [],
    category: "moderation",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<:Fail:739301997575929976>|You do not have the permission to use this command.")

        let bannedUser = await client.users.fetch(args[0])
        if(!bannedUser) return message.channel.send("<:Fail:739301997575929976>|Please provide a user to unbanned!")
    
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason"
    
        try{
            message.guild.members.unban(bannedUser, {reason: reason})
            message.channel.send(`Successfully Unban ${bannedUser.user.tag}`).then(m => m.delete({ timeout: 20000 }))
        } catch (error) {
            console.log(error)
        }
    }
}