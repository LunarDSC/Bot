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
    .setName("rw-setup")
    .setDescription("il setting dei feedback")
    .addChannelOption((option) =>
      option
        .setName("canale")
        .setDescription("in quale canle")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  async execute(interaction, client) {
    try {
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        await interaction.Reply({
          content: "Non hai il permesso di usare il commando",
          ephemeral: true,
        });

        return;
      }

      const { channel, options, guildId } = interaction;
      const fbChannel = options.getChannel("canale");

      const embed = new EmbedBuilder();

      const data = await reviewSchema.findOne({ Guild: guildId });

      if (!data) {
        await reviewSchema.create({
          Guild: guildId,
          Channel: fbChannel.id,
        });

        embed
          .setColor(color.y)
          .setDescription(`è stata settata in ${channel}`);
      } else if (data) {
        const ch = client.channels.cache.get(data.Channel);
        embed
          .setColor(color.acq)
          .setDescription(`Il feedback è stata settata in ${channel}`);
      }

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: `c'è stato un errore nel progresso`,
        ephemeral: true,
      });
    }
  },
};
