const { SlashCommandBuilder, Client  } = require('discord.js');
const { join } = require('path');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus  } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yatta')
		.setDescription('Plays a yatta soundbite!'),
	async execute(interaction) {
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
			const mp3File = 'yattaTrack.mp3';
			let resource = createAudioResource(join('./resources/', mp3File));
			interaction.reply(`Playing ${mp3File} 🔊`)
			player.play(resource);
			player.on(AudioPlayerStatus.Idle, () => {
				player.stop();
				interaction.guild.members.cache.get(interaction.client.user.id).voice.disconnect();
			});
		}		
	},
};