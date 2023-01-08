const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js');
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

		let mainEmbed = new EmbedBuilder();
		let synopsisEmbed = new EmbedBuilder();

		// Scrape data from MAL
		malScraper.getInfoFromName(searchterm)
  			.then((data) => {
				const title = data.title;
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


				const components = (state) => [
					new ActionRowBuilder().addComponents(
						new StringSelectMenuBuilder()
						.setCustomId("select")
						.setPlaceholder("Select")
						.setDisabled(state)
						.addOptions(
							{
								label: 'Information',
								description: 'Information of the anime',
								value: 'first_option',
							},
							{
								label: 'Synopsis',
								description: 'Synopsis of the anime',
								value: 'second_option',
							},
						)
					),
					];
	
				const initialMessage = interaction.reply({
					embeds: [mainEmbed],
					components: components(false),
				});
	
				const filter = (interaction) =>
					interaction.user.id === interaction.member.id;
				
				const collector = interaction.channel.createMessageComponentCollector({
					filter,
				});
	
				collector.on("collect", (interaction) => {
					if(interaction.values[0] == 'first_option') {
						interaction.update({ embeds: [mainEmbed] });
					} else if(interaction.values[0] == 'second_option') {
						interaction.update({ embeds: [synopsisEmbed] });
					}
				});
	
				collector.on("end", () => {
					initialMessage.edit({ components: components(true) });
				});


			})
  			.catch((err) => {
				interaction.reply('Failed to search anime :(')
			})
	},
};
