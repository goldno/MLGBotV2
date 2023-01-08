const { SlashCommandBuilder } = require('discord.js');
const malScraper = require('mal-scraper')
const search = malScraper.search

module.exports = {
	data: new SlashCommandBuilder()
		.setName('searchanime')
		.setDescription('search an anime using MyAnimeList!')
		.addStringOption(option =>
			option.setName('searchterm')
				.setDescription('the anime to search')),
	async execute(interaction) {
		const searchterm = interaction.options.getString('searchterm');

		// Scrape data from MAL
		const title=''; const synopsis=''; const picture=''; const mainChars=[]; const type=''; const episodeCount=''; 
		const premiered=''; const studio=''; const malScore=''; const source=''; const url=''; const genres=''; 
		malScraper.getInfoFromName(searchterm)
  			.then((data) => {
				console.log(data)
				title = data.title;
				synopsis = data.synopsis;
				picture = data.picture;
				data.characters.forEach(char => {
					if(char.role = 'Main')
					mainChars.push({ name: char.name, picture: char.picture })
				})
				type = data.type;
				episodeCount = data.episodes;
				premiered = data.premiered;
				studio = data.studios;
				malScore = data.score;
				source = data.source;
				url = data.url;
				genres = data.genres;
			})
  			.catch((err) => {
				interaction.reply('Failed to search anime :(')
				console.log(err)
			})
		
		// Embeds

		interaction.reply('Not Implemented Yet');
	},
};