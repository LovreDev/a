const fs = require("fs");

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolder = fs.readdirSync("./src/events");
        for (const folder of eventFolder) {
            const files = fs
                .readdirSync(`./src/events/${folder}`)
                .filter((file) => file.endsWith(".js"));

            switch (folder) {
                case "client":
                    for (const file of files) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                default:
                    break;
            }
        }
    }
}