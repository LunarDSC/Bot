const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Cancellare i messagi nella chat")
    .addIntegerOption((option) =>
      option
        .setName("numero")
        .setDescription("Quanti messagi vuoi eliminare 1 a 100")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
    
  async execute(interaction) {
    if (
        !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: `Non hai il permesso di eseguire questo commando`,
        ephemeral: true,
      });

    let number = interaction.options.getInteger("numero");

    const embed = new EmbedBuilder()
      .setColor(color.b)
      .setTimestamp()
      .setDescription(`Messaggi cancellati sono: **${number}**`);

      await interaction.channel.bulkDelete(number);

    interaction.reply({ embeds: [embed] });

    }
};
