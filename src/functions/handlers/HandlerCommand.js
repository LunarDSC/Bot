const { REST, Routes } = require("discord.js");
const fs = require("fs");
const { token } = require("../../../config/bot.json");

module.exports = (client) => {
  client.HandlerCommand = async () => {
    const commandFolders = fs.readdirSync("./srcs/Commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./srcs/Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArry } = client;
      for (const file of commandFiles) {
        const commandFile = require(`./../../../srcs/Commands/${folder}/${file}`);

        const properities = { folder, ...commandFile };
        commands.set(commandFile.data.name, properities);
        commandArry.push(commandFile.data.toJSON());
      }
    }

    const clientID = "mettete il vostro id del bot"; // id del bot
    const rest = new REST({ version: "10" }).setToken(token);

    try {
      console.log(`Commandi in registrazione`);

      await rest.put(Routes.applicationCommands(clientID), {
        body: client.commandArry,
      });

      console.log(`Caricamento è riuscito`);
    } catch (error) {
      console.log(error);
    }
  };
};
