const { ErelaClient } = require("erela.js");

module.exports = (client) => { 
    console.log(`${client.user.username} is online`)

    function StatusSystem() {
        let statuses = ["Ping me for Prefix ^^", "help for commands", "Invite for invtite link"]

        let rstatus = Math.floor(Math.random() * statuses.length)

        client.user.setActivity(statuses[rstatus], {type: "PLAYING"})
    }; setInterval(StatusSystem, 15000)

    client.music = new ErelaClient(client, [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD,
        },
    ]);
    client.music.on("nodeConnect", node => console.log(node))
}