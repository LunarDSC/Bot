const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("progetti")
    .setDescription("potrai inviare i tuoi progetti"),
  async execute(interaction, client) {
    const email = "**__LunarDSC@outlook.it__**";

    const embed = new EmbedBuilder()
      .setColor(color.random)
      .setTitle("Progetti")
      .setDescription("Salve,\nPer caricare il vostri progetti vi basta mandare alla email qui sotto.\nPer avere altri informazioni vi basta aprire un ticket.")
      .addFields(
        {
          name: "Requisiti:",
          value:
            "Max: 1MB\nIn javaScript in discord.js v14\nFormato .zip (al interno un file .txt o .pdf con istruzioni)",
        },
        { name: "Email:", value: `${email}` }
      )
      .addFields({
        name: "Cosa serve?",
        value:
          "Chi ha difficoltà ad comprendere i file in javascript basta che inviare il file per aiuto.",
      })
      .setFooter({
        text: "Progetti",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(
          "https://www.freeprivacypolicy.com/live/06e348dd-8a2e-47b4-9131-5772afb14eba"
        )
        .setLabel("Privacy")
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setURL("https://discord.com/invite/kD7Pvj64c8")
        .setLabel("Supporto")
        .setStyle(ButtonStyle.Link)
    );

    return await interaction.reply({ embeds: [embed], components: [row] });
  },
};
