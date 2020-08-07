const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
    name: "joke",
    description: "Sends a random funny joke",
    usage: "joke",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        let data = await random.getJoke();
        message.channel.send(data);
    }
}