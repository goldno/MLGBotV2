const { SlashCommandBuilder, Client  } = require('discord.js');
const { join } = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus  } = require('@discordjs/voice');
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('laughtrack')
		.setDescription('Plays a laugh track!')
		.addIntegerOption(option =>
			option
				.setName('selection')
				.setMinValue(1)
				.setMaxValue(8)
				.setDescription('the laughtrack selection')),
	async execute(interaction) {
		const selection = interaction.options.getInteger('selection');
		const voiceChannel = interaction.member.voice.channel;
		if(!voiceChannel) {
			interaction.reply('You must be in a voice channel!')
			return;
		} else {
			const player = createAudioPlayer();
			joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
				selfDeaf: false,
				selfMute: false
			}).subscribe(player);
			let chosenLaugh = '';
			if(isInt(selection)) {
				chosenLaugh = `laugh${selection}.mp3`;
				let resource = createAudioResource(join('./resources/soundboard/laughtracks/', chosenLaugh));
				interaction.reply(`Playing ${chosenLaugh} 🔊`)
				player.play(resource);
				player.on(AudioPlayerStatus.Idle, () => {
					player.stop();
					interaction.guild.members.cache.get(interaction.client.user.id).voice.disconnect();
				});
			} else {
				await fs.readdir('./resources/soundboard/laughtracks/', (err, files) => {
					const laughFiles = files.filter(filename => filename.endsWith('.mp3'));
					chosenLaugh = randomElement(laughFiles);
					let resource = createAudioResource(join('./resources/soundboard/laughtracks/', chosenLaugh));
					interaction.reply(`Playing ${chosenLaugh} 🔊`)
					player.play(resource);
					player.on(AudioPlayerStatus.Idle, () => {
						player.stop();
						interaction.guild.members.cache.get(interaction.client.user.id).voice.disconnect();
				});
				})
			}
		}		
	},
};

function randomElement(arg) {
	return arg[Math.floor(Math.random() * arg.length)];
}

function isInt(value) {
	return !isNaN(value) && 
		   parseInt(Number(value)) == value && 
		   !isNaN(parseInt(value, 10));
}