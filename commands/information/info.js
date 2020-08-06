const Discord = require("discord.js");
let days = 0;
let week = 0;

module.exports = {
    name: "info",
    description: "Shows the bot information",
    usage: "info",
    accessableby: "Members",
    aliases: ["botinfo"],
    category: "information",
    run: async (client, message, args) => {
        let uptime = "";
        let totalSecond = (client.uptime / 1000);
        let hours = Math.floor(totalSecond / 3600);
        totalSecond %= 3600;
        let minutes = Math.floor(totalSecond / 60);
        let seconds = Math.floor(totalSecond % 60);
    
        let servers = client.guilds.cache.size;
        let users = client.users.cache.size;
    
        if(hours > 23){
            days = days + 1;
            hours = 0;
        }
    
        if(days == 7){
            days = 0;
            week = week + 1;
        }
    
        if(week > 0){
            uptime += `${week} week, `;
        }
    
        if(minutes > 60){
            minutes = 0;
        }
    
        uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    
        let infoEmbed = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addField("👑|Creator", "<@728587451437940766>\n[728587451437940766]")
        .addField("<:DJS:740020981938126890>|Library", "Discord.js", true)
        .addField("💻|Version", "1.0", true)
        .addField("🌐|Servers", `In ${servers} Servers`)
        .addField("👤|Users", `Watching ${users} Users`, true)
        .addField("🕰|Uptime", `${uptime}`)
        .setColor("PURPLE")
        .setFooter(message.guild.name)
        .setTimestamp()
    
        message.channel.send(infoEmbed)
    }
}