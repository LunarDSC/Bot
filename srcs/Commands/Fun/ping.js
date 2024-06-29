const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping del bot")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.UseApplicationCommands |
        PermissionFlagsBits.ReadMessageHistory
    )
    .setDMPermission(false),
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    try {
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;

      let webLatency = new Date() - interaction.createdAt;
      let apiLatency = client.ws.ping;
      let totalLatency = webLatency + apiLatency;

      let emLatency = {
        Green: "✅",
        Yellow: "⚠️",
        Red: "❌",
      };

      interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor(
              totalLatency < 200
                ? "Green"
                : totalLatency < 500
                ? "Yellow"
                : "Red"
            )
            .addFields(
              {
                name: "`📶` ┃ Latenza del bot",
                value: `\`${
                  webLatency <= 200
                    ? emLatency.Green
                    : webLatency <= 400
                    ? emLatency.Yellow
                    : emLatency.Red
                }\` \`${webLatency}\`ms`,
              },
              {
                name: "`📈` ┃ API Latenza",
                value: `\`${
                  apiLatency <= 200
                    ? emLatency.Green
                    : apiLatency <= 400
                    ? emLatency.Yellow
                    : emLatency.Red
                }\` \`${apiLatency}\`ms`,
              },
              {
                name: "`⌛️` ┃ tempo di attività",
                value: `\`${days}/Giorni\` - \`${hours}/Ore\` - \`${minutes}/Minuti\` - \`${seconds}/Secondi\``,
              }
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
