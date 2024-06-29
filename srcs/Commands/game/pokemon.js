const { GuessThePokemon } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("inizia il gioco dei pokemon"),
  async execute(interaction) {
    const game = new GuessThePokemon({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "che pokemon è",
        color: `${color.b}`,
      },
      timeoutTime: 60000,
      winMessage: "Tu hai indovinato il pokemen giusto, {pokemon}",
      loseMessage: "Hai perso, il pokemon giusto era {pokemon}",
      errMessage: "questo pokemon non esiste",
      playerOnlMessage: "Pronto {player} usa il bottone",
    });

    game.startGame();
    game.on("gameOver", (result) => {
      return;
    });
  },
};
