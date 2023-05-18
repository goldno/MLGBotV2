const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageUpdate,
	async execute(oldMessage, newMessage) {
        /* League message */
        const testRole = '<@&896503336512135269>'
        const leagueRole = '<@&1096596027739480125>'
        const channel = oldMessage.channel;
        const userID = oldMessage.author.id;
        if(newMessage.content.includes(testRole)) {
            newMessage.delete()
                .then(msg => channel.send(`<@${userID}> This command does not exist (good try XD)`))
                .catch(console.error);
        }
	},
};