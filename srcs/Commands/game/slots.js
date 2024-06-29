const { SlashCommandBuilder } = require("discord.js");
const color = require('../../../config/color.json')
const { Slots } = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("slot macchine"),

  async execute(interaction) {
    const Game = new Slots({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "slot macchine",
        color: `${color.a}`,
      },
      slots: ["🍀", "💲", "❄️", "🌺"],
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      return;
    });
  },
};
