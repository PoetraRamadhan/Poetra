const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
    name: "kpop",
    description: "Sends a random kpop artist image",
    usage: "kpop",
    accessableby: "Members",
    aliases: [],
    category: "images",
    run: async (client, message, args) => {
        let data = await random.getKpop();
        message.channel.send(data)
    }
}