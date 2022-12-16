const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('script')
        .setDescription('displays a random bible verse!'),
    async execute(interaction) {
        axios.get('https://labs.bible.org/api/?passage=random').then(resp => {
            const str1 = '<b>';
            const str2 = '</b>';
            const text = resp.data.replace(str1, '');
            const text1 = text.replace(str2, ':');
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const embed = new EmbedBuilder()
                .setColor(randomColor)
                .setAuthor({ name: 'God Says' })
                .setDescription(text1)
                .setFooter({ text: 'Powered by Bible Labs API' });
            interaction.reply({ embeds: [embed] });
        })
        .catch(err => {
            interaction.reply('Failed to retrieve bible verse :(');
            console.log(err);
        });
    },
};