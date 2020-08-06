module.exports = (client) => { 
    console.log(`${client.user.username} is online`)

    function StatusSystem() {
        let statuses = ["*invite to invite me :D", "*help for commands", "Under Development"]

        let rstatus = Math.floor(Math.random() * statuses.length)

        client.user.setActivity(statuses[rstatus], {type: "PLAYING"})
    }; setInterval(StatusSystem, 15000)
}