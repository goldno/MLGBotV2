const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('displays a random waifu based on a category!')
        .addStringOption(option => 
            option.setName('category')
                .setDescription('The waifu category')
                .setRequired(true)
                .addChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'bully', value: 'bully' },
                    { name: 'cuddle', value: 'cuddle' },
                    { name: 'cry', value: 'cry' },
                    { name: 'hug', value: 'hug' },
                    { name: 'awoo', value: 'awoo' },
                    { name: 'kiss', value: 'kiss' },
                    { name: 'pat', value: 'pat' },
                    { name: 'bonk', value: 'bonk' },
                    { name: 'yeet', value: 'yeet' },
                    { name: 'blush', value: 'blush' },
                    { name: 'smile', value: 'smile' },
                    { name: 'wave', value: 'wave' },
                    { name: 'highfive', value: 'highfive' },
                    { name: 'handhold', value: 'handhold' },
                    { name: 'nom', value: 'nom' },
                    { name: 'bite', value: 'bite' },
                    { name: 'glomp', value: 'glomp' },
                    { name: 'slap', value: 'slap' },
                    { name: 'kill', value: 'kill' },
                    { name: 'kick', value: 'kick' },
                    { name: 'happy', value: 'happy' },
                    { name: 'wink', value: 'wink' },
                    { name: 'poke', value: 'poke' },
                    { name: 'dance', value: 'dance' },
                )),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        axios.get(`https://api.waifu.pics/sfw/${category}`).then(resp => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const image = resp.data.url;
            const embed = new EmbedBuilder()
                .setColor(randomColor)
                .setImage(image)
                .setFooter({ text: 'Powered by Waifu.Pics API' });
            interaction.reply({ embeds: [embed] });
        })
        .catch(err => {
            interaction.reply('Failed to retrieve waifu :(');
            console.log(err);
        });
    },
};