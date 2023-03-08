const { 
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType, 
} = require("discord.js");
const base64 = require("base-64");

const auther = [
    "!da", "gGj!", "Tg#", "vO#", "cgR", "/$!", "/%g", "#/U", "hbf", "jvi", "Ugi", "?Ww", "JGf", "JEI", "FJU",
    "$#g", "!Vd", "%Wf", "egE", "sam", "ueL", "lOv", "re&", "enC", "vE!", "!f!", "c$T", "ion", "ifF", "vER"
];

function reverseString(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: "Something went wrong...",
                    ephemeral: true
                })
            }
        }

        if (interaction.type === InteractionType.ModalSubmit) {
            if (interaction.customId === "link-modal") {
                const response = interaction.fields.getTextInputValue("link-input");

                const randomAuther = auther[Math.floor(Math.random() * auther.length)];
                const randomAuther2 = auther[Math.floor(Math.random() * auther.length)];
                const user = reverseString(response).toLowerCase();

                const code = base64.encode(String(randomAuther + user + randomAuther2 + base64.encode(reverseString(interaction.user.tag)))).replace("=", "").replace("=", "");
                interaction.reply({ 
                    content: `<@${interaction.user.id}> Your code is `+"`х"+code+"`", 
                    ephemeral: true 
                });
            }
        }
    }
}