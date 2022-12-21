const { SlashCommandBuilder, SelectMenuOptionBuilder } = require('discord.js');
const DEV1_ID = process.env.DEV1_ID;
const DEV2_ID = process.env.DEV2_ID;

// OpenAI Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Generates an image based on a prompt')
		.addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the AI to generate an image')),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');
		//let image_url = '';
		await interaction.deferReply();
		try {
			const image = await openai.createImage({
				prompt: prompt,
				n: 1,
			});
			let image_url = image.data.data[0].url;
			await interaction.editReply(image_url);
		} catch (error) {
			if (error.response) {
				console.log(error.response.status);
				console.log(error.response.data);
				if(error.response.data.error.message == 'Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system.') {
					interaction.editReply('This prompt is not allowed :/')
				}
			} else {
				console.log(error.message);
			}
		}
	},
};