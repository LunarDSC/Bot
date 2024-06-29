const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannare i membri chi non rispetta le regole")
    
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi bannre")
        .setRequired(true)
    )
    
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo del ban")
    )
    
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    const reason =
      interaction.options.getString("motivo") ?? "Non c'è il motivo";
    const member = await interaction.guild.members.fetch(user.id);

    const banEmbed = new EmbedBuilder()
      .setColor(color.random)
      .setTitle("Ban")
      .setDescription(`Bannato ${user.username} per ${reason}`);

    await interaction.reply({ embeds: [banEmbed] });
    await member.ban({ reason: reason });
  },
};
