const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("untimeout")
    .setDescription("Leva il timeout hai utenti")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Chi vuoi mettere in timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("il motivo del timeout")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("membro");
    const member = await interaction.guild.members.fetch(user.id);

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

    await member.timeout(null, motivo);

    await member.timeout(duration * 1000, motivo);

    const embed = new EmbedBuilder()
      .setColor(color.red)
      .setDescription(
        `✅ ${user.tag} il timeout ti è stato tolto | ${motivo}`
      );

    const dmEmbed = new EmbedBuilder()
      .setColor(color.b)
      .setDescription(
        `✅ Ti hanno tolto il timeout in ${interaction.guild.name} | ${motivo}`
      );

    await member.send({ embeds: [dmEmbed] }).catch((err) => {
      return;
    });

    await interaction.reply({ embeds: [embed] });
  },
};
