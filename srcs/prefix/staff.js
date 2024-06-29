const {
  EmbedBuilder,
  PermissionsBitField,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder
} = require("discord.js");

const color = require('../../config/color.json');
const info = require('../../config/desc')

module.exports = {
  name: "staff",
  description: "Lista dei commandi",

  run: async (client, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    )
      return await message.reply({
        content: `${info.staff}`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setTitle("Lista dei commandi dello staff")
      .setDescription("Questi sono tutti commandi del bot")
      .addFields(
        {
          name: "`SlashCommand` (**/**):",
          value: `▪ /warn\n▪ /timeout\n▪ /untimeout\n▪ /info-user\n▪ /avvisi\n▪ /depex\n▪ /pex\n▪ /role\n▪ /clear\n▪ /ban\n▪ /unban\n▪ /tempban\n▪ /kick\n▪ /spine\n▪ /rw-setup\n▪ /rw-disable`,
          inline: true,
        },
        {
          name: "`PrefixCommand` (**!**):",
          value: `▪ !staff\n▪ !autorole`,
          inline: true,
        }
      )
      .setColor(color.random)
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1178267902764400757/1205865065887170580/D_2.png?ex=65d9ec5b&is=65c7775b&hm=28e982b47838cbc57dec6801c3a8dd826ac6a3f0e934e1eb25bb9dfc6c5bbad5&"
      )
      .setFooter({
        text: "Lista dei commandi dello staff",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

      const support = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
        .setURL("https://discord.com/invite/kD7Pvj64c8")
        .setLabel("Supporto")
        .setStyle(ButtonStyle.Link)
      )

    message.reply({ embeds: [embed], components: [support], ephemeral: true });
  },
};
