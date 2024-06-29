const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggerimanti")
    .setDescription("Suggerimenti per il server")
    .addStringOption((o) =>
      o
        .setName("nome")
        .setDescription("nome del tuo suggerimento [no nomi utenti]")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName("descrizione")
        .setDescription("la descrizione del tuo suggerimento")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { guild, options, member } = interaction;

    const name = options.getString("nome");
    const desc = options.getString("descrizione");

    const embed = new EmbedBuilder()
      .setColor(color.random)
      .setDescription(`Il suggerimento di: ${member}`)
      .addFields(
        { name: "Suggerimento:", value: `${name}` },
        { name: "Descrizione:", value: `${desc}` }
      )
      .setFooter({
        text: member.user.tag,
        iconURL: member.displayAvatarURL({ dynamic: true }),
      });

    await interaction.reply({ embeds: [embed] })
      .then((s) => {
        s.react("✅");
        s.react("❌");
      })
      .catch((err) => {
        throw err;
      });

    interaction.reply({
      content:
        "✅ | Il tuo suggerimento è stato inviato correttamente",
      ephemeral: true,
    });
  },
};
