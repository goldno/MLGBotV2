const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const generalTestID = "618902972700819469"
const watchPartyID = "1180248299819778058"

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldMember, newMember) {
        //console.log(oldMember);
        //console.log(newMember);

        // let newUserChannelID = newMember.channelId;
        // let oldUserChannelID = oldMember.channelId;

        // if(newUserChannelID === generalTestID) {
        //     console.log("User joined voice channel!");

        //     const modal = new ModalBuilder()
        //     .setCustomId('JoinChannel')
		// 	.setTitle('Watch Party! (shhhh)');
        // } else {
        //     //console.log("User left voice channel!");
        // }
	},
};