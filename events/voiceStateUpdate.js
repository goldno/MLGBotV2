const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const generalTestID = "618902972700819469"
const watchPartyID = "1180248299819778058"

module.exports = {
	name: Events.VoiceStateUpdate,
	async execute(oldMember, newMember) {
        // console.log(oldMember);
        // console.log(newMember);

        let newUserChannelID = newMember.channelId;
        let oldUserChannelID = oldMember.channelId;

        // if(newUserChannelID === generalTestID) {
        //     console.log("User joined voice channel!");

        //     const modal = new ModalBuilder()
        //     .setCustomId('JoinChannel')
		// 	.setTitle('Watch Party! (shhhh)');
        // } else {
        //     //console.log("User left voice channel!");
        // }

        /* Sour patch kid cheese touch */
        // const prunedChannelID = "1117631591364182086";
        // const testGeneralID = "618902972700819469";
        // const generalVoiceChannelID = "1158252699704381481";
        // const SPKidID = "90182872316510208";

        // const members = await newMember.guild.members.fetch();
        // const randMember = members.random();

        // if(newUserChannelID = testGeneralID) {
        //     if(newMember.channel.members.find(member => member.user.id === SPKidID).user.id =) {
        //         console.log("This is the sp kid!")
        //     }
        // }
	},
};