import fs from 'fs';
import path from 'path';

import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
// import { setupMenuCommand } from './commands';
import config from '../config.json';
import { sendWelcomeMessage } from './welcome';
import { handleInteraction } from './interaction';

export class BotClient {
    static client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });
    static rest: REST = new REST({ version: '9' }).setToken(config.token);

    static commands: Collection<string, any> = new Collection();

    constructor() {
        this.loadCommands();
        this.registerEventHandlers();
    }

    private loadCommands(): void {
        const commandsPath = path.join(__dirname, '/commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const { command } = require(filePath);

            console.log(`Registering command: ${command.data.name}`);
            BotClient.commands.set(command.data.name, command);
        }
    }

    private registerEventHandlers(): void {
        BotClient.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const command = BotClient.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
    // public getClient(): Client {
    //     return BotClient.client;
    // }

    async start() {
        try {
            const commandsArray = Array.from(BotClient.commands.values()).map(cmd => cmd.data.toJSON());
            await BotClient.rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: commandsArray }
            );

            console.log('Successfully registered application commands.');
            await BotClient.client.login(config.token);
            BotClient.client.user?.setActivity('with mata');
            sendWelcomeMessage.init(BotClient.client);
            handleInteraction(BotClient.client);
        } catch (error) {
            console.error('Failed to start the bot:', error);
        }
    }
}