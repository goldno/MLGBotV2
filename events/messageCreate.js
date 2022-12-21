const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		/* If 2 ICANT emoji are posted, post WECANT emoji */
        const icantEmoji = '<:ICANT:1054942801240002630>';
        const wecantEmoji = '<:wecant:1054942811784482867>';
        await message.channel.messages.fetch({ limit: 2 }).then(messages => {
            const msgs = Array.from(messages.values());
            if(msgs[0].content == icantEmoji && msgs[1].content == icantEmoji) message.channel.send(`${wecantEmoji}`);
        });
	},
};