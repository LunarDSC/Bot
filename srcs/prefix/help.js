const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

const info = require('../../config/desc.json')
const color = require('../../config/color.json')

module.exports = {
  name: "help",
  description: "Lista dei commandi",

  run: async (client, message, args) => {

    

    const embed = new EmbedBuilder()
      .setTitle("Lista dei commandi")
      .setDescription("Questi sono tutti commandi del bot")
      .addFields(
        {
          name: "`SlashCommand` (**/**):",
          value: `▪ /talent-show\n- ${info.show}\n\n▪ /fantacalcio\n- ${info.calcio}\n\n▪ /report\n- ${info.rep}\n\n▪ /progetti\n- ${info.progetti}\n\n▪ /buy\n- ${info.buy}\n\n▪ /feedback\n- ${info.feedback}\n\n▪ /slots\n- ${info.slott}\n\n▪ /impicato\n- ${info.impicato}\n\n▪ /pokemon\n- ${info.pokemon}\n\n▪ /2048\n- ${info.game}\n\n▪ /ping\n- ${info.ping}\n\n▪ /info-server\n- ${info.server}\n\n▪ /info-bot\n- ${info.bot}\n▪ /suggerimento\n- ${info.suggerimento}`,
          inline: true,
        },
        {
          name: "`PrefixCommand` (**!**):",
          value: `▪ !help\n- ${info.help}\n\n▪ !ship\n- ${info.ship}\n\n▪ !staff\n- ${info.staff}`,
          inline: true,
        }
      )
      .setColor(color.random)
      .setTimestamp()
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1178267902764400757/1205865065887170580/D_2.png?ex=65d9ec5b&is=65c7775b&hm=28e982b47838cbc57dec6801c3a8dd826ac6a3f0e934e1eb25bb9dfc6c5bbad5&"
      )
      .setFooter({
        text: "Lista dei commandi",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

    const support = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setURL("https://discord.com/invite/kD7Pvj64c8")
        .setLabel("Supporto")
        .setStyle(ButtonStyle.Link)
    );

    message.reply({ embeds: [embed], components: [support] });
  },
};
