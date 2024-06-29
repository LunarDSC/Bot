const { SlashCommandBuilder, EmbedBuilder, time } = require("discord.js");
const packageJSON = require("../../../package.json");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info-bot")
    .setDescription(`Informazioni del bot`),
  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true });

    const info = new EmbedBuilder().setColor(color.white);

    const uptime = new Date(Date.now() - client.uptime);

    info.setAuthor({
      name: client.user.tag,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    });
    info.addFields(
      {
        name: `Ping:`,
        value: `/ping`,
        inline: true,
      },
      { name: `Uptime:`, value: time(uptime, "R"), inline: true },
      {
        name: `Memoria usata:`,
        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`,
        inline: true,
      },
      {
        name: `CPU usata:`,
        value: `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
        inline: true,
      },
      { name: `Node.js version:`, value: process.version, inline: true },
      {
        name: `Discord.js version:`,
        value: packageJSON.dependencies["discord.js"],
        inline: true,
      }
    );
    info.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

    await interaction.editReply({ embeds: [info] });
  },
};
