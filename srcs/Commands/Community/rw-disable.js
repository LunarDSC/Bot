const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField,
} = require("discord.js");
const reviewSchema = require("../../../schema.js/review");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disable")
    .setDescription("Disabilità il commando"),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      return await interaction.reply({
        content: "non hai il permesso di eseguire questo commando",
        ephemeral: true,
      });
    }

    const { guildId } = interaction;

    const embed = new EmbedBuilder();

    try {
      const deleteResult = await reviewSchema.deleteMany({ Guild: guildId });
      if (deleteResult.deleteCount > 0) {
        embed.setColor(color.dark).setDescription(`è stato disativato`);
      } else {
        embed
          .setColor(color.yellow)
          .setDescription("Il sistema di review è disabilitato");
      }

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);

      embed.setColor(color.red).setDescription("Il disabilamento è falito");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
