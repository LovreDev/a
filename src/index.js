require('dotenv-vault-core').config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = process.env;
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functions = fs.readdirSync(`./src/functions`);
for (const folder of functions) {
    const files = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of files) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(token);