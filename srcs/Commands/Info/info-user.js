const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, time } = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info-user")
    .setDescription("Informazione dei utenti")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option.setName("membro").setDescription("Richiesta del info del bot")
    )
    .setDMPermission(false),

  async execute(interaction, client) {
    const member = interaction.options.getMember("membro") || interaction.member;

    const userinfoEmbed = new EmbedBuilder()
      .setColor(color.random)
      .setAuthor({
        name: `${member.user.username} Info`,
        iconURL: member.user.displayAvatarURL(),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: `**Nome**`,
          value: `${member.user.username}#${member.user.discriminator}`,
          inline: true,
        },
        { name: `**ID**`, value: member.user.id, inline: true },
        {
          name: `**Creazione:**`,
          value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Status:`,
          value: getStatusText(member.presence.status),
          inline: true
        },
        {
          name: `**Entrato nel server:**`,
          value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `**Ruoli:**`,
          value: `${member.roles.cache.map((role) => role.toString())}`,
        },
        {
          name: `Entrato nel server:`,
          value: time(member.joinedAt, "R"),
          inline: true,
        }
      )
      .setFooter({ text: `${member.user.username} Info` });

    await interaction.deferReply({ fetchReply: true });
    await interaction.editReply({ embeds: [userinfoEmbed] });
  },
};

function getStatusText(status) {
  switch (status) {
    case "online":
      return "`🟢` Online";
    case "idle":
      return "`🌙` inattivo";
    case "dnd":
      return "`⛔️` non disturbare";
    case "offline":
      return "`⚫️` offline";
    default:
      return "`❓` Unknown";
  }
}
