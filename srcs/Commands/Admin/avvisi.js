const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const color = require('../../../config/color.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avviso")
    .setDescription("avvisare utenti che non rispetta le regole")
    .addUserOption((o) => o.setName("membro").setDescription("chi è"))
    .addStringOption((o) =>
      o.setName("messaggio").setDescription("motivo")
    )
    .addNumberOption((o) => o.setName("numero").setDescription("1 - 5"))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { options, channel } = interaction;

    const user = options.getUser("membro");
    const msg = options.getString("messaggio");
    const number = options.getNumber("numero");
    

    const embed = new EmbedBuilder()
    .setTitle("Segnalazioni")
    .setColor(color.red)
    .setFields(
      { name: "*__Membro__*:", value: `${user}`},
      { name: "*__Motivo__*:", value: `${msg}`},
      { name: "*__Avvisi__*:", value: `**${number}/5**`},
        { name: "Ricorso per l'avviso basta che apri il ticket", value: `Nel server Discordia...`}
    )
    .setFooter({ text: interaction.guild.name })
    .setTimestamp()

    const support = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
      .setURL("https://discord.com/invite/kD7Pvj64c8")
      .setLabel("Supporto")
      .setStyle(ButtonStyle.Link)
    )

    await interaction.reply({ content: `${user}`, embeds:  [embed], components: [support] })
  },
};
