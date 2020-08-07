const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
    name: "neko",
    description: "Sends a random neko image",
    usage: "neko",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        let data = await random.getNeko();
        message.channel.send(data);
    }
}