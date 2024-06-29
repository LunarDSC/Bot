const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { ms } = require("tech-tip-cyber");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tempban")
    .setDescription("ban a g,o,m,s")
    .addStringOption((option) =>
      option
        .setName("membro")
        .setDescription("Il membro che vuoi mettere a tempo ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Motivo del ban")
    )
    .addStringOption((option) =>
      option.setName("time").setDescription("Quanto time per il ban")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction, client) {
    const user = interaction.options.getUser("membro");
    const time = interaction.options.getString("time");
    const reason =
      interaction.options.getString("motivo") ?? "Non c'è il motivo";
    const member = await interaction.guild.members.fetch(user.id);

    const sbanEmbed = new EmbedBuilder()
      .setColor(color.random)
      .setTitle("Tempban")
      .setDescription(`Bannato ${user.username} per ${reason}`);

    await interaction.reply({ embeds: [sbanEmbed] });
    await member.ban({ reason: reason });

    setTimeout(async () => {
      const tempsban = new EmbedBuilder()
        .setColor(color.random)
        .setTitle("tempo per sban")
        .setDescription(`${user.username} vieni sbannato dopo ${time}`);

      await interaction.reply({ embeds: [tempsban] });

      await interaction.guild.members.unban(user);
    });
  },
};
