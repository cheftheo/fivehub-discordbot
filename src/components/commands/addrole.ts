import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('choose-role')
        .setDescription('Select a role to assign'),
    
    async execute(interaction: any) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Role Selection')
            .setDescription('Choose a role from the dropdown menu below.');

        const menu = new SelectMenuBuilder()
            .setCustomId('select-role')
            .setPlaceholder('No role selected')
            .addOptions(
                {
                    label: 'Role 1',
                    description: 'Assigns Role 1',
                    value: 'role1',
                },
                {
                    label: 'Role 2',
                    description: 'Assigns Role 2',
                    value: 'role2',
                },
                {
                    label: 'Role 3',
                    description: 'Assigns Role 3',
                    value: 'role3',
                }
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};