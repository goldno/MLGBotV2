const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('chatgpt response')
		.addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the AI to generate a response')),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');
		const embed = new EmbedBuilder()
			.setTitle('Chat GPT')
			.setDescription(`Prompt: ${prompt}`)
			.setFooter({ text: 'Prodia API | Image Model: sdv1_4.ckpt' })
		//await interaction.deferReply();

        axios.get('https://free.churchless.tech/v1/chat/completions').then(resp => {
            console.log(resp.data);
        });

        //embed.setFields(response);
        await interaction.editReply({ embeds: [embed] });
	},
};