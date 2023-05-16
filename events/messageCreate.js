const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        /* League message */
        const testRole = '<@&896503336512135269>'
        const leagueRole = '<@&1096596027739480125>'
        const channel = message.channel;
        const user = message.author.id;
        const errorMessages = ['Error. This operation completed successfully.',
                            'Proceding with this command will delete you. Are you sure?',
                            'Click \'OK\' to continue.',
                            'Error. Cannot send this message.',
                            'An error has occurred.',
                            'Task failed successfully.',
                            'You\'re screwed.',
                            'Something bad happened.',
                            'You\'ve been warned multiple times that this command does not exist. Now you\'ve made us catch this worthless exception and we\'re upset. Do not do this again.',
                            'User error. Replace user.',
                            'Are you sure you want to install this malware?',
                            'Connection failed.',
                            'Get better.',
                            'You\'re trolling.',
                            'Don\'t look behind you...',
                            'Your computer will now shut down.',
                            'This command has stopped working. Please don\'t try again later.',
                            'OwO What\'s THIS? You appear to have encountered an error, it will be alright though (nuzzles you), awooooo',
                            'No.'];
        if(message.content.includes(leagueRole)) {
            message.delete()
                .then(msg => channel.send(errorMessages[Math.floor(Math.random() * errorMessages.length)]))
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