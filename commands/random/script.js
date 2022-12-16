const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const request = require('request');
const options = {
    headers: {
      'User-Agent': 'MLGBotV2'
    },
    json: true
  };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('script')
        .setDescription('Rdisplays a random bible verse!'),
    async execute(interaction) {
        request('https://labs.bible.org/api/?passage=random', options, (err, res, body) => {
            if(err) {
                message.channel.send('Failed to retrieve bible verse :(');
                return console.log(err);
            }
            const str1 = '<b>';
            const str2 = '</b>';
            const text = body.replace(str1, '');
            const text1 = text.replace(str2, ':');
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const embed = new EmbedBuilder()
                .setColor(randomColor)
                .setAuthor({ name: 'God Says' })
                .setDescription(text1)
                .setFooter({ text: 'Powered by Bible Labs API' });

            interaction.reply({ embeds: [embed] });
            return;
        });
    },
};