const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
var stringSimilarity = require("string-similarity");

// OpenAI Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('imagegame')
		.setDescription('Given a randomly generated image, guess the prompt!'),
	async execute(interaction) {
		const prompts = readCSV('./resources/randomprompts.csv');
		const randomPrompt = pickRandom(prompts);
		console.log(randomPrompt);

		const embed = new EmbedBuilder()
			.setTitle('Image Generator Game')
			.setFooter({ text: 'OpenAI_API' })
		await interaction.deferReply();

		// Generate image from random prompt and play game
		try {
			const image = await openai.createImage({
				prompt: randomPrompt,
				n: 1,
			});
			let image_url = image.data.data[0].url;
			embed.setImage(image_url)
			await interaction.editReply({ embeds: [embed] });

			// Get guess and check similarity
			var filter = m => m.author.id == interaction.user.id;
			await interaction.followUp({ content: 'What do you think the prompt was? (30 seconds to guess)', fetchReply: true })
				.then(() => {
					interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
						.then(collected => {
							const answer = collected.first().content;
							const similarity = stringSimilarity.compareTwoStrings(randomPrompt, answer);
							console.log(`Similarity: ${similarity}`);
							let result = '';
							if(similarity < 0.25)  result = 'Not even close!';
							else if(similarity >= 0.26 && similarity < 0.6) result = 'Not Bad!';
							else result = 'Very Good!';
							interaction.followUp(`${result}\n The original prompt was **${randomPrompt}**`);
						})
				})
		} catch (error) {
			if (error.response) {
				console.log(error.response.status);
				console.log(error.response.data);
				interaction.editReply('The API could not generate an image :(')
			} else {
				console.log(error.message);
				interaction.editReply('The API could not generate an image :(')
			}
		}
		
	},
};

function readCSV(filePath) {
	const data = fs.readFileSync(filePath, 'utf8');
	const lines = data.split('\n');
	return lines;
}

function pickRandom(list) {
	const randomIndex = Math.floor(Math.random() * list.length);
	return list[randomIndex];
}