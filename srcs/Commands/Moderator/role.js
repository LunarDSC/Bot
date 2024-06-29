const {
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require("discord.js");
  const color = require('../../../config/color.json')
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("role")
      .setDescription("Gestire i ruoli del server o dei membri.")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  
      .addSubcommand((subcommand) =>
        subcommand
          .setName("add")
          .setDescription("Aggiungi ruolo a un utente.")
          .addRoleOption((option) =>
            option
              .setName("ruolo")
              .setDescription("Il ruolo che desideri aggiungere all'utente.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("membro")
              .setDescription("L'utente a cui vuoi aggiungere il ruolo.")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remove")
          .setDescription("Rimuovere il ruolo da un utente.")
          .addRoleOption((option) =>
            option
              .setName("ruolo")
              .setDescription("Il ruolo che desideri rimuovere dall'utente.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("membro")
              .setDescription("L'utente a cui desideri rimuovere il ruolo.")
              .setRequired(true)
          )
      ),
  
    async execute(interaction) {
      if (interaction.options.getSubcommand() === "add") {
        try {
          const member = interaction.options.getMember("membro");
          const role = interaction.options.getRole("ruolo");
  
          await member.roles.add(role);
  
          const embed = new EmbedBuilder()
            .setTitle("Role Added")
            .setDescription('Segnato con successo')
            .addFields(
              { name: 'Membro:', value: `${member}`},
              { name: 'Ruolo:', value: `${role}`}
            )
            .setColor(color.green)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed] });
        } catch {
          return interaction.reply({
            content: `Non sono riuscito a aggiungere quel ruolo perché dispone di autorizzazioni mod/amministratore. In caso contrario, contatta uno sviluppatore per segnalare il bug.`,
          });
        }
      }
      if (interaction.options.getSubcommand() === "remove") {
        try {
          const member = interaction.options.getMember("membro");
          const role = interaction.options.getRole("ruolo");
  
          await member.roles.remove(role);
  
          const embed = new EmbedBuilder()
            .setTitle("Role Removed")
            .setDescription('Rimosso con successo')
            .addFields(
              { name: 'Membro:', value: `${member}`},
              { name: 'Ruolo:', value: `${role}`}
            )
            .setColor(color.green)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed] });
        } catch {
          return interaction.reply({
            content: `Non sono riuscito a rimuovere quel ruolo perché dispone di autorizzazioni mod/amministratore. In caso contrario, contatta uno sviluppatore per segnalare il bug.`,
          });
        }
      }
    },
  };