const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Mette in timeout gli utenti chi non rispetta le regole")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Chi vuoi mettere in timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("durata")
        .setDescription("In quanto tempo")
        .addChoices(
          { name: "60s", value: "60" },
          { name: "5m", value: "300" },
          { name: "10m", value: "600" },
          { name: "10h", value: "36000" },
          { name: "1d", value: "86400" },
          { name: "1se", value: "604800" }
        )
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("il motivo del timeout")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("membro");
    const member = await interaction.guild.members.fetch(user.id);
    const duration = interaction.options.getString("durata");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return interaction.reply({ content: ``, ephemeral: true });
    if (!member)
      return await interaction.reply({
        content: "Il membro non viene menzionato nei log",
        ephemeral: true,
      });
    if (!member.kickable)
      return await interaction.reply({
        content: "Non è stato timeout il membro",
        ephemeral: true,
      });
    if (interaction.member.id === member.id)
      return await interaction.reply({
        content: "Non puoi auto-timeout",
        ephemeral: true,
      });
    if (member.permissions.has(PermissionsBitField.Flags.Administrator))
      return await interaction.reply({
        content: "Non puoi mettere in timeout le persone, ti serve il ruolo `Admin`",
        ephemeral: true,
      });

    let motivo = interaction.options.getString("motivo") || "Non c'è motivo";

    await member.timeout(duration * 1000, motivo);

    const embed = new EmbedBuilder()
      .setColor(color.red)
      .setDescription(
        `:white_check_mark: ${user.tag} sei stato timeout per ${
          duration / 60
        } minuti | ${motivo}`
      );

    const dmEmbed = new EmbedBuilder()
      .setColor(color.b)
      .setDescription(
        `:white_check_mark: sei stato timeout in ${interaction.guild.name}. Motivo del timeout ${motivo}`
      );

    await member.send({ embeds: [dmEmbed] }).catch((err) => {
      return;
    });

    await interaction.reply({ embeds: [embed] });
  },
};
