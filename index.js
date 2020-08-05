const Discord = require("discord.js");
const { prefix, token } = require("./botSettings.json");
const ascii = require("ascii-table");
const mongoose = require("mongoose");

const client = new Discord.Client({
    disableMentions: "everyone"
})

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

fs.readdir("./events/", (err, files) => {
    if(err) console.log(err);
    let table = new ascii();
    table.setHeading("Events", "Statuses");
    files.forEach((file) => {
        if(!file.endsWith(".js")) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split(".")[0];
        table.addRow(evtName, "✅ Success!");
        console.log(table.toString());
        client.on(evtName, evt.bind(null, client));
    });
});

client.login(token);