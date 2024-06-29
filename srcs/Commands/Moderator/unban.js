const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Per sbannare i membri")
    .addStringOption((option) =>
      option
        .setName("membroid")
        .setDescription("id del membro")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo del sban")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    const reason =
      interaction.options.getString("motivo") ?? "Non c'è il motivo";
    const member = await interaction.guild.members.fetch(user.id);

    try {
      const sbanEmbed = new EmbedBuilder()
        .setColor(color.random)
        .setTitle("Sban")
        .setDescription(`E' stato sbannato ${user.username} per ${reason}`);

      await interaction.reply({ embeds: [sbanEmbed] });
      await interaction.guild.members.unban(user);
    } catch (err) {
      const error = new EmbedBuilder()
        .setColor(color.random)
        .setTitle("errore per lo sban")
        .setDescription("Controllare il `ID` del membro che sia valido");

      await interaction.reply({ embeds: [error] });
    }
  },
};
