const { SlashCommandBuilder } = require("discord.js");
const color = require('../../../config/color.json')

const { TwoZeroFourEight } = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("2048")
    .setDescription("gioco del 2048"),

  async execute(interaction) {
    const Game = new TwoZeroFourEight({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "2048",
        color: `${color.v}`,
      },

      emojis: {
        up: "⬆️",
        down: "⬇️",
        left: "⬅️",
        right: "➡️",
      },
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      playerOnlyMessage: "Only {play} clicca i bottoni per giocare.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      return;
    });
  },
};
