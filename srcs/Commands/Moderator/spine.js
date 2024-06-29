const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const color = require('../../../config/color.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("vedi messaggi eliminati"),

  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "Non hai permesso di eseguire il commando",
        ephemeral: true,
      });

    const msg = client.snipes.get(interaction.channel.id);
    if (!msg)
      return await interaction.reply({
        content: "Non ci sono messaggi cncellati",
        ephemeral: true,
      });

    const ID = msg.author.id;
    const member = interaction.guild.members.cache.get(ID);
    const URL = member.diplayAvatarURL();

    const embed = new EmbedBuilder()
      .setColor(color.a)
      .setTitle(`Messagi di: ${member.user.tag}`)
      .setDescription(`${msg.content}`)
      .setTimestamp()
      .setFooter({ text: `ID: ${ID}`, iconURL: `${URL}` });

    if (msg.image) embed.setImage(msg.image);
    await interaction.reply({ embeds: [embed] });
  },
};
