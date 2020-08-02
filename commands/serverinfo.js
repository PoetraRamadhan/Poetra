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

    function checkIdleUsers(guild) {
        let idleCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "idle")
            idleCount++;
        });
        return idleCount;
    }

    function checkDndUsers(guild) {
        let dndCount = 0;
        guild.members.cache.forEach(member => {
            if(member.user.presence.status === "dnd")
            dndCount++;
        })
        return dndCount;
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
    .addField("👑|Owner", `${message.guild.owner}\n[${message.guild.owner.id}]`, true)
    .addField("🌐|Region", message.guild.region, true)
    .setThumbnail(guildIcon)
    .addField("🔒|Verification", message.guild.verificationLevel, true)
    .addField("👤|Total Members", message.guild.memberCount, true)
    .addField("#️⃣|Total Channels", message.guild.channels.cache.size, true)
    .addField("<:Boost:739302864563994705>|Total Boost", `${message.guild.premiumSubscriptionCount} Boost (Tier ${message.guild.premiumTier})`, true)
    .addField("<:Online:739302910932025474>|Online", `${checkOnlineUsers(message.guild)} Users`, true)
    .addField("<:Idle:739302949532205146>|Idle", `${checkIdleUsers(message.guild)} Users`, true)
    .addField("<:DND:739302986915774494>|DnD", `${checkDndUsers(message.guild)} Users`, true)
    .addField("<:Invisible:739303023976775710>|Offline/invisible", `${checkOfflineUsers(message.guild)} Users`, true)
    .setImage(message.guild.bannerURL())
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