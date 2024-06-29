export const handleInteraction = (client: any) => {
    console.log('Handling interactions...');
    client.on('interactionCreate', async (interaction: any) => {
        if (!interaction.isSelectMenu()) return;
    
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
    });
}