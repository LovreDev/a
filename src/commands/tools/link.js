const { 
    SlashCommandBuilder,  
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType, 
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("link")
        .setDescription("Get a code to link your discord account to roblox."),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('link-modal')
            .setTitle('Link your discord account.')
            .addComponents([
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('link-input')
                        .setLabel('Roblox Username')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(3)
                        .setMaxLength(20)
                        .setPlaceholder('Insert Roblox username')
                        .setRequired(true)
                ),
            ]);

        await interaction.showModal(modal);
    }
}