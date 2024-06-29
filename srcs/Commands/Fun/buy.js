const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");

const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Potrai vedere tutti i commandi in vendità"),
  async execute(interaction, client) {
    const support = "https://discord.com/invite/kD7Pvj64c8";
    const privacy =
      "https://www.freeprivacypolicy.com/live/06e348dd-8a2e-47b4-9131-5772afb14eba";

    const embed = new EmbedBuilder()
      .setColor(color.random)
      .setTitle("Negozio")
      .setDescription("Questi sono tutti i commandi disponibili nel mercato")
      .addFields(
        { name: "Privacy", value: `${privacy}` },
        { name: "Supporto", value: `${support}` }
      )
      .setFooter({
        text: "Shopping del bot",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot")
        .setStyle(ButtonStyle.Primary)
        .setLabel('🤖 File del bot'),
        new ButtonBuilder()
        .setCustomId('command')
        .setLabel('📝 Commandi custom')
        .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
        .setCustomId('mercato')
        .setLabel('🛒 In arrivo')
        .setStyle(ButtonStyle.Danger)
      )

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
