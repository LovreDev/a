const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolder = fs.readdirSync("./src/commands");
        for (const folder of commandFolder) {
            const files = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for (const file of files) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command ${command.data.name} has been registered.`);
            }
        }
        
        const clientId = "1082798950240768041";
        const guildId = "1049774852678111315";
        const rest = new REST({ version: "9" }).setToken(process.env.token);
        try {
            console.log("Started refreshing application");

            await rest.put(Routes.applicationCommands(clientId, guildId),
                { body: client.commandArray },
            );

            console.log("Success");
        } catch (error) {
            console.error(error)
        }
    }
}