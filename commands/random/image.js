const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// OpenAI Configuration
/*
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
*/

const { Prodia } = require("prodia.js");
const prodia = new Prodia(process.env.PRODIA_KEY);

async function imageGenerator(prompt) {
    const job = await prodia.createJob({
        model: "sdv1_4.ckpt [7460a6fa]",
        prompt: prompt,
        negative_prompt: "text, blur, duplicate, distorted, naked, nude, racist",
    });

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob(job.job);
    }

    return job;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Generates an image based on a prompt')
		.addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the AI to generate an image')),
	async execute(interaction) {
		const prompt = interaction.options.getString('prompt');
		const embed = new EmbedBuilder()
			.setTitle('Image Generator')
			.setDescription(`Prompt: ${prompt}`)
			.setFooter({ text: 'Prodia API | Image Model: sdv1_4.ckpt' })
		await interaction.deferReply();

		try {
			const job = await imageGenerator(prompt);
			//console.log(job);
			let image_url = job.imageUrl;
			embed.setImage(image_url)
			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.error("Error:", error);
			interaction.editReply(`Error with prompt: ${prompt}`)
		}

		/*
		try {
			const image = await openai.createImage({
				prompt: prompt,
				n: 1,
			});
			let image_url = image.data.data[0].url;
			embed.setImage(image_url)
			await interaction.editReply({ embeds: [embed] });
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
		*/
	},
};