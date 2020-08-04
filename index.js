const Discord = require("discord.js");
const mongoose = require("mongoose");
const { token, prefix } = require("./botSettings.json");

const client = new Discord.Client({
    disableMentions: "everyone"
})
mongoose.connect("mongodb+srv://Poetra:PoetraDB@poetradb.fjne5.mongodb.net/Data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

require("./util/eventHandler")(client);

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.mentions.users.size){
        if(message.mentions.users.first().id == client.user.id){
            return message.reply(`My Prefix is: \`\`${prefix}\`\``)
        }
    }

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandFile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commandFile) commandFile.run(client, message, args)

});

client.login(token);