const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kiccare il membro nel server")
    .addUserOption((o) =>
      o
        .setName("membro")
        .setDescription("Chi vuoi buttare fuori dal server")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("motivo").setDescription("il motivo dell'espulsione dal server")
    ),
  async execute(interaction) {
    const { options, guild } = interaction;
    const userkick = options.getUser("membro");
    const memberkick = await guild.members.fetch(userkick.id);

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "Non hai permesso di eseguire il commando",
        ephemeral: true,
      });

    if (!memberkick)
      return await interaction.reply({
        content: "Il nome inserito non si trova in questo gruppo",
      });

    if (!memberkick.kickable)
      return await interaction.reply({
        content: "non hai il permesso di kiccare quella persona",
      });

    let reason = options.getString("motivo");

    if (!reason) reason = "Non c'è il motivo";

    const embedDM = new EmbedBuilder()
      .setColor(color.a)
      .setDescription(`Sei stato kiccato nel **${guild.name}** per ${reason}`);

    const embed = new EmbedBuilder()
      .setColor(color.purple)
      .setDescription(
        `Kiccato con successo ${userkick.tag} dal server. | ${reason}`
      );

    await memberkick.send({ embeds: [embedDM], ephemeral: true }).catch((e) => {
      return;
    });

    await memberkick.kick({ reason: reason }).catch((e) => {
      interaction.reply({ content: "errore", ephemeral: true });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
