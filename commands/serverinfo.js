const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    }

    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
            if(!member.user.bot) memberCount++
        });
        return memberCount;
    }

    function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "online")
                onlineCount++;
        });
        return onlineCount;
    }

    function checkOfflineUsers(guild) {
        let offlineCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "offline")
                offlineCount++;
        });
        return offlineCount;
    }

    let guildIcon = message.guild.iconURL({ dynamic: true, format: "png"});
    let serverEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}'s Information`, message.guild.iconURL({ dynamic: true, format: "png"}))
    .addField("Server Owner", `${message.guild.owner}\n[${message.guild.owner.id}]`, true)
    .addField("Server Region", message.guild.region, true)
    .setThumbnail(guildIcon)
    .addField("Server Name", `${message.guild.name}\n[${message.guild.id}]`)
    .addField("Verification Level", message.guild.verificationLevel, true)
    .addField("Total Channels", message.guild.channels.cache.size)
    .addField("Total Members", message.guild.memberCount, true)
    .addField("Users", checkMembers(message.guild))
    .addField("Bots", checkBots(message.guild), true)
    .addField("Online", checkOnlineUsers(message.guild))
    .addField("Offline", checkOfflineUsers(message.guild), true)
    .setFooter("Created At:")
    .setTimestamp(message.guild.createdAt)

    message.channel.send(serverEmbed)
}

module.exports.config = {
    name: "serverinfo",
    description: "Shows the server's information",
    usage: "*serverinfo",
    accessableby: "Members",
    aliases: []
}