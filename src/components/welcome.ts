import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import config from '../config.json';

export const sendWelcomeMessage = {
    async clearBotMessages(channel: any) {
        if (!channel.isTextBased()) return;
        
        let shouldContinue = true;

        while (shouldContinue) {
            const messages = await channel.messages.fetch({ limit: 100 });
            const botMessages = messages.filter((msg: any) => msg.author.id === channel.client.user.id);
            
            if (botMessages.size > 0) {
                await channel.bulkDelete(botMessages);
            }

            shouldContinue = messages.size >= 100;
        }
    },

    async init(client: any) {
        const channel = await client.channels.fetch(config.welcomeChannelId);
        if (!channel.isTextBased()) return;

        await this.clearBotMessages(channel);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Role Selection')
            .setDescription('Please select your role from the dropdown menu below.');

        const roleMenu = new StringSelectMenuBuilder()
            .setCustomId('select-role')
            .setPlaceholder('No role selected')
            .addOptions([
                {
                    label: 'Role 1',
                    description: 'Assigns Role 1',
                    value: '1256352588442636490',
                },
                {
                    label: 'Role 2',
                    description: 'Assigns Role 2',
                    value: 'role2_id',
                },
                {
                    label: 'Role 3',
                    description: 'Assigns Role 3',
                    value: 'role3_id',
                }
            ]);

        const row = new ActionRowBuilder().addComponents(roleMenu);

        await channel.send({
            content: 'Hello! Please choose a role from the menu below.',
            embeds: [embed],
            components: [row]
        });
    }
};