const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  VoiceChannel,
  GuildEmoji,
} = require("discord.js");
const client = require("../../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("musica")
    .addSubcommand((s) =>
      s
        .setName("play")
        .setDescription("avvia la musica")
        .addStringOption((o) =>
          o
            .setName("nome")
            .setDescription("specifica il nome o URL")
            .setRequired(true)
        )
    )
    .addSubcommand((s) =>
      s
        .setName("volume")
        .setDescription("mette il volume alla canzone che volete")
        .addNumberOptions(o => o.setName('perc')
        .setMinValue(1)
        .setMaxValue(100)
        .Required(true))
    )
    .addSubcommand((s) =>
      s
        .setName("options")
        .setDescription("opzioni del musica")
        .addStringOption((o) =>
          o
            .setName("options")
            .setDescription("seleziona che vuoi fare")
            .setRequired(true)
            .addChoices(
              { name: "queue", value: "queue" },
              { name: "skip", value: "skip" },
              { name: "pause", value: "pause" },
              { name: "resume", value: "resume" },
              { name: "stop", value: "stop" },
              { name: "loop-queue", value: "loop-queue" },
              { name: "loop-all", value: "loop-all" },
              { name: "autoplay", value: "autoplay" }
            )
        )
    ),
  async execute(interaction) {
    const { options, member, guild, channel } = interaction

    const sub = options.getSubcommand()
    const query = options.getString('nome')
    const volume = options.getNumber("perc")
    const option = options.getString('options')
    const voiceChannel = member.voice.channel

    const embed = new EmbedBuilder()

    if (voiceChannel) {
        
    }
  },
};
