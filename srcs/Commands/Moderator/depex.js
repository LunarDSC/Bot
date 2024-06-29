const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("depex")
    .setDescription("recezione del ruolo")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((o) =>
      o.setName("nome").setDescription("chi è il fortunato")
    )
    .addRoleOption((o) => o.setName("ruolo-1").setDescription("ruolo"))
    .addRoleOption((o) =>
      o.setName("ruolo-2").setDescription("ruolo della promozione")
    )
    .addStringOption((o) =>
      o.setName("motivo").setDescription("motivo della promozione")
    ),
  async execute(interaction, client) {
    
      const { options } = interaction;

      const name = options.getUser("nome");
      const role1 = options.getRole("ruolo-1");
      const role2 = options.getRole("ruolo-2");
      const msg = options.getString("motivo");

      const pex = new EmbedBuilder()
        .setTitle("Depex")
        .addFields(
          { name: "Nome:", value: `${name}` },
          { name: "Ruolo:", value: `${role1} ➨ ${role2}` },
          { name: "Motivo:", value: `${msg}` }
        )
        .setFooter({ text: `${interaction.guild.name}` })
        .setTimestamp();

      await interaction.reply({ content: `${name}`, embeds: [pex] });
    
  },
};
