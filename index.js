/* Requires */
require("dotenv").config();
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits, EmbedBuilder, AttachmentBuilder  } = require("discord.js");
const fs = require("fs");
const cron = require('cron');

const token = process.env.token;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

// Initialize commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`${commandsPath}/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`${commandsPath}/${folder}/${file}`);
    const properties = { folder, ...command };
    client.commands.set(command.data.name, properties);
  }
}

// Initialize events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/* CronJob scheduled Discord message testing */
const scheduledMessage = new cron.CronJob('00 09 18 * * *', () => {
    const channelGeneral = client.channels.cache.get('931019066867609690');
    const server = client.guilds.cache.get('734586607285567528');
    const randomUser = server.members.cache.random();
    const userID = randomUser.id;
    const flushedEmoji = '<:flushedBIG:793533537407467581>';
    channelGeneral.send(`<@${userID}> Hey you sussy baka ${flushedEmoji}, You're looking quite submissive and breedable tonight.`);
}, null, true, 'America/New_York');
scheduledMessage.start();

function randomElement(arg) {
  return arg[Math.floor(Math.random() * arg.length)];
}

/* MLG Birthday Message */
const csv = fs.readFileSync('./resources/mlgbirthdays.csv', "utf8");
const lines = csv.split("\n");
const headers = lines[0].split(",");
headers[headers.length - 1] = headers[headers.length - 1].replace("\r", "");
const birthdays = [];
for (let i = 1; i < lines.length; i++) {
  const obj = {};
  lines[i] = lines[i].replace("\r", "")
  const currentLine = lines[i].split(",");
  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = currentLine[j];
  }
  birthdays.push(obj);
}
const birthdayMessage = new cron.CronJob('00 00 10 * * *', () => {
  const channelGeneral = client.channels.cache.get('931019066867609690');
  let currentDate = new Date();
  let dd = String(currentDate.getDate()).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  currentDate = mm + '/' + dd;
  birthdays.forEach(member => {
    if(member.date == currentDate) {
      const folderPath = './resources/birthdayImages/';
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        const gamerRole = '734586975713099789';
        const jpgFiles = files.filter(filename => filename.endsWith('.jpg'));
        const randomImg = randomElement(jpgFiles);
        const attachment = new AttachmentBuilder(folderPath+randomImg);

        const embed = new EmbedBuilder()
        if(member.name == "Arun") {
          embed
          .setTitle('Happy Birthday Arun!')
          .setDescription(`Happy Birthday to Arun!!!!`)
          .setImage(`attachment://${randomImg}`);
        } else {
          embed
          .setTitle('Happy Birthday!')
          .setDescription(`Happy Birthday to <@${member.id}>!!!!`)
          .setImage(`attachment://${randomImg}`);
        }
        channelGeneral.send({ content: `<@&${gamerRole}>`, embeds: [embed], files: [attachment] });
      });
    }
  })
} , null, true, 'America/New_York');
birthdayMessage.start();


client.login(token);