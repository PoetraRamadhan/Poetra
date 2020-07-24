const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do nut have the permission to use this command.")

    let bannedUser = await client.users.fetch(args[0])
    if(!bannedUser) return message.channel.send("Please provide a user to unbanned!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason"

    try{
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Successfully unBan ${bannedUser.tag}`, "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqiK692F33PbCxxcrJjTaHmIk68heDGtXbJA&usqp=CAU")
        .setColor("BLUE")
        message.guild.members.unban(bannedUser, {reason: reason})
        message.channel.send(embed)
    } catch (error) {
        console.log(error)
        message.channel.send(`ERROR:\n\`\`\`${error}\`\`\``)
    }
}

module.exports.config = {
    name: "unban",
    description: "Unbans a member from this Guild",
    usage: "*unban <UserID> [reason]",
    accessableby: "Staff",
    aliases: []
}