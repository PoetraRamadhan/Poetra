const { Random }  = require("something-random-on-discord");
const random = new Random();

module.exports = {
    name: "advice",
    description: "Sends some advice",
    usage: "advice",
    accessableby: "Members",
    aliases: [],
    category: "fun",
    run: async (client, message, args) => {
        let data = await random.getAdvice()
        message.channel.send(data)
    }
}