const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('displays a random joke!')
        .addBooleanOption(option =>
            option.setName('includensfw')
                .setDescription('Whether or not to include NSFW jokes')),
    async execute(interaction) {
        const includeNSFW = interaction.options.getBoolean('includensfw');
        let jokeLink = '';
        if(includeNSFW) { jokeLink = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit'; }
        else { jokeLink = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'; }

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const embed = new EmbedBuilder()
            .setColor(randomColor)
            .setFooter({ text: 'Powered by JokeAPI' });
        axios.get(jokeLink).then(resp => {
            if(resp.data.type === 'twopart') {
                const cat = resp.data.category;
                const setup = resp.data.setup;
                const delivery = resp.data.delivery;
                embed
                    .setTitle(`Joke - ${cat}`)
                    .setDescription(setup+'\n\n'+delivery)
            } else {
                const cat = resp.data.category;
                const text = resp.data.joke;
                embed
                    .setTitle(`Joke - ${cat}`)
                    .setDescription(text);
            }
            interaction.reply({ embeds: [embed] });
        })
        .catch(err => {
            interaction.reply('Failed to retrieve joke :(');
            console.log(err);
        });
    },
};