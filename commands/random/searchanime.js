const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const malScraper = require('mal-scraper')
const search = malScraper.search

module.exports = {
	data: new SlashCommandBuilder()
		.setName('searchanime')
		.setDescription('search an anime using MyAnimeList!')
		.addStringOption(option =>
			option.setName('searchterm')
				.setDescription('the anime to search')
				.setRequired(true)),
	async execute(interaction) {
		const searchterm = interaction.options.getString('searchterm');
		await interaction.deferReply();

		let mainEmbed = new EmbedBuilder();
		let synopsisEmbed = new EmbedBuilder();
		let title = '';

	

		// Scrape data from MAL
		await malScraper.getInfoFromName(searchterm)
  			.then((data) => {
				title = data.title;
				const synopsis = data.synopsis;
				const picture = data.picture;
				let mainChars=[];
				let mainCharPics = []
				data.characters.forEach(char => {
					if(char.role = 'Main')
					mainChars.push({ name: char.name, picture: char.picture })
					mainCharPics.push(char.picture);
				})
				const type = data.type;
				const episodeCount = data.episodes;
				const premiered = data.premiered;
				const studio = data.studios;
				const malScore = data.score;
				const source = data.source;
				const url = data.url;
				const genres = data.genres;
				const status = data.status;

				// Embeds
				mainEmbed
					.setTitle(`${title}`)
					.setURL(`${url}`)
					.setFooter({ text: 'MyAnimeList' })
					.setImage(picture)
					.setTimestamp()
					.setThumbnail('https://i.imgur.com/kNgqOTd.png')
					.setDescription(`**Information**
									MAL Score: ${malScore}
									Type: ${type}
									Episodes: ${episodeCount}
									Status: ${status}
									Aired: ${premiered}
									Studio(s): ${studio}
									Source: ${source}
									Genres: ${genres}`);

				synopsisEmbed
					.setTitle(`${title}`)
					.setURL(`${url}`)
					.setFooter({ text: 'MyAnimeList' })
					.setImage(picture)
					.setThumbnail('https://i.imgur.com/kNgqOTd.png')
					.setDescription(synopsis);

			})
  			.catch((err) => {
				interaction.editReply('Failed to search anime :(')
			})


			const components = (state) => [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
					.setCustomId("select")
					.setPlaceholder("Select")
					.setDisabled(state)
					.addOptions(
						{
							label: `${title} Information`,
							description: 'Information of the anime',
							value: `${title} Information`,
						},
						{
							label: `${title} Synopsis`,
							description: 'Synopsis of the anime',
							value: `${title} Synopsis`,
						},
					)
				),
			];
			
			const initialMessage = await interaction.editReply({
				embeds: [mainEmbed],
				components: components(false),
			});

			const filter = (interaction) => interaction.user.id === interaction.member.id;
			
			const collector = interaction.channel.createMessageComponentCollector({
				filter,
			});

			collector.on("collect", async (interaction) => {
				if(interaction.values[0] == `${title} Information`) {
					await interaction.update({ embeds: [mainEmbed] });
				} else if(interaction.values[0] == `${title} Synopsis`) {
					await interaction.update({ embeds: [synopsisEmbed] });
				}
			});

			collector.on("end", async () => {
				initialMessage.edit({ components: components(true) });
			});
	},
};
