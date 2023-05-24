const { Events } = require('discord.js');
var stringSimilarity = require("string-similarity");

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        /* League message */
        const testRole = '<@&896503336512135269>'
        const leagueRole = '<@&1096596027739480125>'
        const channel = message.channel;
        const userID = message.author.id;
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
                            'No.',
                            'Sorry, No.'];
        const okUser = '689195119035154441'
        if(message.content.includes(leagueRole)) {
            message.delete()
                .then(msg => channel.send(`<@${userID}> ${errorMessages[Math.floor(Math.random() * errorMessages.length)]}`))
                .catch(console.error);
        } else {
            console.log(message.content.toLowerCase())
            var similarity1 = stringSimilarity.compareTwoStrings(message.content.toLowerCase(), 'league');
            var similarity2 = stringSimilarity.compareTwoStrings(message.content.toLowerCase(), 'lol');
            var similarity3 = stringSimilarity.compareTwoStrings(message.content.toLowerCase(), 'league of legends');
            var similarity4 = stringSimilarity.compareTwoStrings(message.content.toLowerCase(), 'l3ague');
            var similarity5 = stringSimilarity.compareTwoStrings(message.content.toLowerCase(), 'l0l');
            console.log(similarity2)
            if(similarity1 >= 0.7 || similarity2 >= 0.7 || similarity3 >= 0.7 || similarity4 >= 0.7 || similarity5 >= 0.7) {
                message.delete()
                    .then(msg => channel.send(`<@${userID}> You have sent an  illegal word.`))
                    .catch(console.error);
            }
        }

		/* If 2 ICANT emoji are posted, post WECANT emoji */
        const icant1 = '<:ICANT:927771695450828840>';
        const icant2 = '<:ICANT:1081267987299975208>';
        const wecantEmoji = '<:wecant:939359818043514960>';
        message.channel.messages.fetch({ limit: 2 }).then(messages => {
            const msgs = Array.from(messages.values());
            if((msgs[0].content == icant1  || msgs[0].content == icant2) && (msgs[1].content == icant1 || msgs[0].content == icant2))  
            { 
                message.channel.send(`${wecantEmoji}`); 
            }
        });
	},
};