
const Discord = require("discord.js");
const { prefix } = require("../botSettings.json");
const mongoose = require("../mongoose");

module.exports = async (client) => { 
    console.log(`${client.user.username} is online`)

    await mongoose().then(mongoose => {
        try {
            console.log("Connected To MongoDB!")
        } finally {
            mongoose.connection.close()
        }
    })

    function StatusSystem() {
        let statuses = ["*invite to invite me :D", "*help for commands", "Under Development"]

        let rstatus = Math.floor(Math.random() * statuses.length)

        client.user.setActivity(statuses[rstatus], {type: "PLAYING"})
    }; setInterval(StatusSystem, 15000)
}