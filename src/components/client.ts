import { Client, GatewayIntentBits } from 'discord.js';
import { config } from '../config.json';

export class BotClient {
    static client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

    start() {
        BotClient.client.login(config.token);
        BotClient.client.on('ready', () => {
            console.log(`Logged in as ${BotClient.client.user?.tag}!`);
            BotClient.client.user?.setActivity('with pula mea');
        });
    };
};