import config from '../config.json';

export const handleInteraction = (client: any) => {
    client.on('interactionCreate', async (interaction: any) => {
        // if (!interaction.isSelectMenu()) return;
    
        if (interaction.customId === 'select-role') {
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
    
            if (!role) {
                await interaction.reply({ content: 'Role not found.', ephemeral: true });
                return;
            }
    
            try {
                await interaction.member.roles.add(role);
                await interaction.reply({ content: `You have been assigned the role: ${role.name}`, ephemeral: true });
            } catch (error) {
                console.error('Error adding role:', error);
                await interaction.reply({ content: 'Failed to assign role. Make sure I have the proper permissions!', ephemeral: true });
            }
        }

        if (interaction.customId === 'verify-account') {
            await interaction.deferUpdate();
            await interaction.member.roles.add(config.verifiedRole);
            await interaction.editReply({ content: 'You have been verified!' });
        }
    });
}

export const handleJoin = (client: any) => {
    client.on('guildMemberAdd', async (member: any) => {
        const channel = await client.channels.fetch(config.joining);
    
        const embed = {
            color: 0x0099ff,
            title: 'Welcome!',
            description: `Welcome to the server, ${member.user.username}!`,
            timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });
    });
}

export const handleLeave = (client: any) => {
    client.on('guildMemberRemove', async (member: any) => {
        const channel = await client.channels.fetch(config.joining);

        const embed = {
            color: 0x0099ff,
            title: 'Goodbye!',
            description: `Goodbye, ${member.user.username}!`,
            timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });

        console.log(`Goodbye, ${member.user.username}!`);
    });
}