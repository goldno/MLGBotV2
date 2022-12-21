const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		/* If 2 ICANT emoji are posted, post WECANT emoji */
        const icantEmoji = '<:icant:951864616496017499>';
        const wecantEmoji = '<:wecant:939359818043514960>';
        await message.channel.messages.fetch({ limit: 2 }).then(messages => {
            const msgs = Array.from(messages.values());
            if(msgs[0].content == icantEmoji && msgs[1].content == icantEmoji) message.channel.send(`${wecantEmoji}`);
        });
	},
};