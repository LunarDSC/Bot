const { Hangman } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("impicato")
    .setDescription("inizia il game del gioco l'impicato"),
  async execute(interaction) {
	  
	  const words = ["gatto", "pizza", "dependenza", "sushi", "italia", "ferrari", "computer"];
	  
	  const wordRandom = Math.floor(Math.random() * words.length);
    const game = new Hangman({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "impicato",
        color:  `${color.b}`,
      },
      hangman: { hat: "🎩", head: "😳", shirt: "👕", pants: "👖", boots: "🧦" },
      customWord: words[wordRandom],
      theme: "winter",
      winMessage: "Tu hai indovinato la parola giusta, **{word}**",
      loseMessage:
        "Non hai indovinato la parola, la parola giusta era **{word}**",
      playerOnlyMessage: "Sei pronto {player}",
    });

    game.startGame();
    game.on("gameOver", (result) => {
      return;
    });
  },
};
