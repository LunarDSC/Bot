const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const reviewSchema = require("../../../schema.js/review");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("FeedBack per il server")
    .addStringOption((option) =>
      option
        .setName("messaggio")
        .setDescription("Il feedback")
        .setMaxLength(1000)
        .setMinLength(1)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("stelle")
        .setDescription("Quante stelle ci metti (1-5)")
        .setRequired(true)
        .addChoices(
          { name: `⭐️`, value: `⭐️` },
          { name: `⭐️⭐️`, value: `️⭐️⭐️` },
          { name: `⭐️⭐️⭐️`, value: `⭐️⭐️⭐️` },
          { name: `⭐️⭐️⭐️⭐️`, value: `⭐️⭐️⭐️⭐️` },
          { name: `⭐️⭐️⭐️⭐️⭐️`, value: `⭐️⭐️⭐️⭐️⭐️` }
        )
    ),
  async execute(interaction) {
    const message = interaction.options.getString("messaggio");
    const stars = interaction.options.getString("stelle");

    try {
      const data = await reviewSchema.findOne({ Guild: interaction.guild.id });
      if (!data) {
        await interaction.reply({
          content: `Sistema di feedback non è settato`,
          ephemeral: true,
        });
        return;
      }

      const interactionEmbed = new EmbedBuilder()
        .setTitle(`Feedback inviato`)
        .setColor(color.green)
        .setDescription(`Grazie del feedback`)
        .setTimestamp();

      const reviewEmbed = new EmbedBuilder()
        .setTitle(`Feedback | ${interaction.guild.name}`)
        .setColor(color.random)
        .addFields({ name: 'Messaggio:', value: `- ${message}`})
        .addFields({ name: `Stelle:`, value: `${stars}` })
        .addFields({
          name: `Membro:`,
          value: `${interaction.user.tag} | ID: ${interaction.user.id}`,
        })
        .setFooter({ text: `${interaction.guild.name}` })

      const channel = interaction.guild.channels.cache.get(data.Channel);
      if (!channel) {
        await interaction.reply({
          content: `Il canale non è stato settato`,
          ephemeral: true,
        });

        return;
      }

      await interaction.reply({ embeds: [interactionEmbed] });
      await channel.send({ embeds: [reviewEmbed] });
    } catch (err) {
      console.log(err);

      await interaction.reply({
        content: "c'e stato un errore",
        ephemeral: true,
      });
    }
  },
};
