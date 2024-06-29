const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");
  const info = require('../../../config/desc.json')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("fantacalcio")
      .setDescription("Info sul fantacalcio chi lo segue"),
    async execute(interaction) {
      const calcio = new EmbedBuilder()
        .setTitle("⚽ Fantacalcio")
        .setDescription(
          "Salve,\n• Per partecipare al fantacalcio vi basta compilare un modulo che viene dato (`cliccando il bottone qui sotto`), dopo aver fatto vi basta mandare un messaggio alla pagina instagram"
        )
        .addFields({
          name: "Requisiti per partecipare:",
          value:
            `${info.is}`,
        });
  
      const link = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("Rules")
          .setLabel("📜 Regolmento")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("Punti")
          .setLabel("🎖️ Punteggi")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setLabel("📷 Instagram")
          .setURL("https://www.instagram.com/_seriea_tim.canino_/")
          .setStyle(ButtonStyle.Link)
      );
  
      await interaction.reply({ embeds: [calcio], components: [link] });
    },
  };