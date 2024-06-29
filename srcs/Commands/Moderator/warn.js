const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn chi non rispetta le regole")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che deve essere warnato.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setDescription("Motivazione del warn")
        .setRequired(false)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "Non hai permesso di eseguire il commando",
        ephemeral: true,
      });

    const member = interaction.options.getUser("membro");
    const reason = interaction.options.getString("motivo");

    if (!reason) reason = "Non c'è il motivo";

    const dmSend = new EmbedBuilder()
      .setColor(color.acq)
      .setDescription(
        `Sei stato warnato ${interaction.guild.name} | ${reason}`
      );

    const embed = new EmbedBuilder()
      .setColor(color.red)
      .setDescription(`Sei stato warnnato: ${member} | ${reason}`);

    await interaction.reply({ embeds: [embed] });

    await member.send({ embeds: [dmSend] }).catch((err) => {
      return;
    });
  },
};
