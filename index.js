require("dotenv").config();
const path = require('node:path');
const token = process.env.token;
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const cron = require('cron');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Initialize commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`${commandsPath}/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

// Initialize events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/* CronJob scheduled Discord message testing */
const scheduledMessage = new cron.CronJob('00 09 18 * * *', () => {
    const channelGeneral = client.channels.cache.get('931019066867609690');
    const server = client.guilds.cache.get('734586607285567528');
    const randomUser = server.members.cache.random();
    const userID = randomUser.id;
    const flushedEmoji = '<:flushedBIG:793533537407467581>';
    channelGeneral.send(`<@${userID}> Hey you sussy baka ${flushedEmoji}, You're looking quite submissive and breedable tonight.`);
}, null, true, 'America/New_York');
scheduledMessage.start();

client.login(token);