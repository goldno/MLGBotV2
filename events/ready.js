const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('Valorant', { type: ActivityType.Playing });
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};