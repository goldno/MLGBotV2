const { SlashCommandBuilder } = require('discord.js');
const adminID = process.env.ADMINID;
const channelID = process.env.MLGGENERAlID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Print text from the bot (admin only)!')
		.addStringOption(option => 
			option
				.setName('text')
				.setDescription('text for the bot to print')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.user.id;
		const channel = interaction.guild.channels.cache.get(channelID);
		const text = interaction.options.getString('text');
		if(user != adminID) {
			await interaction.reply({ content: 'You do not have permission to use this command :/', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Text has been sent', ephemeral: true });
			channel.send(text);
		}
	},
};