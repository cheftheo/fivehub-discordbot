import config from '../config.json';

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"

export const verifyHandler = {
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
        const channel = await client.channels.fetch(config.verify);
        if (!channel.isTextBased()) return;

        await this.clearBotMessages(channel);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Verification')
            .setDescription('Please click the button below to verify your account.');

        const button = new ButtonBuilder()
            .setCustomId('verify-account')
            .setLabel('Primary')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await channel.send({
            content: 'Hello! Please verify your account.',
            embeds: [embed],
            components: [row]
        });
    }
};