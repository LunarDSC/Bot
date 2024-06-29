const { SlashCommandBuilder, EmbedBuilder, time } = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info-server")
    .setDescription(`Informazioni del server`),
  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true });

    const { options, guild } = interaction;

    const info = new EmbedBuilder().setColor(color.white);

  
        info.setAuthor({
          name: guild.name,
          iconURL: guild.iconURL({ dynamic: true }),
        });
        info.addFields(
          { name: `Capo:`, value: `<@${guild.ownerId}>`, inline: true },
          { name: `Membri:`, value: `${guild.memberCount}`, inline: true },
          { name: `Ruoli:`, value: `${guild.roles.cache.size}`, inline: true },
          { name: `Canali:`, value: `${guild.channels.cache.size}`, inline: true },
          {
            name: `Creato da:`,
            value: time(guild.createdAt, "R"),
            inline: true,
          },
          {
            name: `Boost:`,
            value: `${guild.premiumSubscriptionCount}`,
            inline: true,
          }
        );
        info.setThumbnail(guild.iconURL({ dynamic: true }));
    

    await interaction.editReply({ embeds: [info] });

  },
};
