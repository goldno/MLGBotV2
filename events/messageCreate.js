const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        /* League message */
        const testRole = '<@&896503336512135269>'
        const leagueRole = '<@&1096596027739480125>'
        const channel = message.channel;
        const user = message.author.id;
        if(message.content.includes(testRole)) {
            message.delete()
                .then(msg => channel.send('Error. Cannot send this message.'))
                .catch(console.error);
        }

		/* If 2 ICANT emoji are posted, post WECANT emoji */
        const icantEmoji = '<:icant:927771695450828840>';
        const wecantEmoji = '<:wecant:939359818043514960>';
        await message.channel.messages.fetch({ limit: 2 }).then(messages => {
            const msgs = Array.from(messages.values());
            if(msgs[0].content == icantEmoji && msgs[1].content == icantEmoji) message.channel.send(`${wecantEmoji}`);
        });
	},
};