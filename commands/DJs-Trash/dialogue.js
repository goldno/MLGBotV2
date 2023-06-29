const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const fs = require("fs");
const csv = require("csv");

/* !!!
 - Add everyone's description from the discord
 - Add sub commands to allow the entering of multiple users
 - Replace the names with @s
*/
  
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dialogue')
		.setDescription('Creates dialogue')
    .addIntegerOption(option =>
			option
        .setName('amount')
				.setDescription('Amount of people in dialogue, with a maximum of 10')
    )
    .addStringOption(option => 
      option
          .setName('location')
          .setDescription('the location where the dialogue takes place')
          )
    .addStringOption(option => 
      option
          .setName('prompt')
          .setDescription('what the dialogue is about')
          ),
	async execute(interaction) {
        await interaction.deferReply();
        const gamers = readCSV("gamers.csv");
        let amountOfGamers = interaction.options.getInteger('amount')
        let location = interaction.options.getString('location')
        let prompt = interaction.options.getString('prompt')

        if(!amountOfGamers || amountOfGamers > 10){
          amountOfGamers = Math.floor(Math.random() * (4 - 2)) + 2;
        }

        if(!location){
          locationCSV = readCSV("locations.csv")
          location = locationCSV[selectRandom(locationCSV)].location
        }
        console.log(location);
        if(!prompt){
          promptCSV = readCSV("prompts.csv")
          prompt = promptCSV[selectRandom(promptCSV)].prompts
        }
        console.log(prompt);
        const stringOfGamers = selectGamers(gamers, amountOfGamers, true);       
        const openai = new OpenAIApi(configuration);

        const thePrompt = `Write me a 20 line random dialogue between the characters ${stringOfGamers} They are located at the ${location}. The scenario is ${prompt}`  
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: thePrompt,
          max_tokens: 2048,
          temperature: .75,
          n: 2
        });
        console.log(thePrompt)
        console.log(completion.data.choices[0].text);
        response = completion.data.choices[0].text
        await interaction.editReply(response);
	},
};

function readCSV(filePath) {
    const csv = fs.readFileSync(filePath, "utf8");
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    headers[headers.length - 1] = headers[headers.length - 1].replace("\r", "");
    console.log(headers)
    const result = [];
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      lines[i] = lines[i].replace("\r", "")
      const currentLine = lines[i].split(",");
    
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
  
      result.push(obj);
    }
    
    console.log(result)
    return result;
  }

function selectGamers(gamers, numGamers, isRandom = false){
    if(isRandom){
        const length = gamers.length;
        let luckyGamers = [];
        let randomGamer = 0
        while(luckyGamers.length <= (numGamers - 1)){
            console.log(luckyGamers.length)
            randomGamer = Math.floor(Math.random() * (length));
            if (!luckyGamers.includes(randomGamer)){
                luckyGamers.push(randomGamer);
              }}
        let stringOfGamers = "";
        luckyGamers.forEach(g =>  {
          if(g != (luckyGamers.length - 1)){
            stringOfGamers = stringOfGamers.concat(gamers[g].name, " " , gamers[g].description, ", ")
          }
          else{
            stringOfGamers = stringOfGamers.concat(gamers[g].name, " " , gamers[g].description, ".")
          }

        })
        console.log(stringOfGamers)
        return stringOfGamers;
    }   
    else {
        console.log("Not yet implemented")
    }
}

function selectRandom(array){
  return Math.floor(Math.random() * (array.length));
}