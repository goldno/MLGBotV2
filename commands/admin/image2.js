const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const adminID = process.env.ADMINID;

// OpenAI Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image2')
		.setDescription('Generates an image based on a prompt using OpenAI')
		.addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the AI to generate an image')),
	async execute(interaction) {
		const user = interaction.user.id;
		if(user != adminID) {
			await interaction.reply({ content: 'You do not have permission to use this command :/', ephemeral: true });
		} else {
			const prompt = interaction.options.getString('prompt');
			const embed = new EmbedBuilder()
				.setTitle('Image Generator')
				.setDescription(`Prompt: ${prompt}`)
				.setFooter({ text: 'OpenAI' })
			await interaction.deferReply();
	
			try {
				const image = await openai.createImage({
					prompt: prompt,
					n: 1,
					size: "1024x1024",
				});
				let image_url = image.data.data[0].url;
				embed.setImage(image_url)
				console.log('image url:', image_url)
				await interaction.editReply({ embeds: [embed] });
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.data);
					if(error.response.data.error.message == 'Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system.') 
					{
						interaction.followUp(`The prompt, [${prompt}], is not allowed :/`)
					}
					if(error.response.data.error.message == 'Billing hard limit has been reached') 
					{
						interaction.followUp(`Billing limit for the month reached :/`)
					}
				} else {
					console.log(error.message);
				}
			}
		}
	},
};