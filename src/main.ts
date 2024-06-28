// import { Client, Intents } from 'discord.js';
// import { Routes } from 'discord-api-types/v9';
// import { SlashCommandBuilder } from '@discordjs/builders';

// import config from './config.json';

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// client.on('ready', () => {
// 	console.log(`Logged in as ${client.user?.tag}!`);
// 	client.user?.setActivity('with pula');
// });


// client.on("messageCreate", (message) => {
// 	if (message.content.startsWith("ping")) {
// 	  message.channel.send("pong!");
// 	}
// });

// client.login(config.token);

import { BotClient } from './components/client';

const client = new BotClient();
client.start();