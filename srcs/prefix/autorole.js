const roleData = require("../../database/autorole");

module.exports = {
  name: "autorole",
  description: "Change autorole per server!",
  args: "Yes",
  usage: "!autorole <Role|off>",
  aliases: ["ar", "joinrole"],
  userPerms: ["ManageRoles"],
  botPerms: ["ManageRoles"],

  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        `\`Usage: ${message.client.prefix}autorole <@role|off>\``
      );
    }
    if (message.mentions.roles.first()) {
      const data = await roleData.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await roleData.findOneAndRemove({
          GuildID: message.guild.id,
        });

        message.channel.send(
          `Il ruolo automatico è attivo e il ruolo è impostato su ${message.mentions.roles.first()}`
        );

        let newData = new roleData({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      } else if (!data) {
        message.channel.send(
          `Il ruolo automatico è attivo e il ruolo è impostato su ${message.mentions.roles.first()}`
        );

        let newData = new roleData({
          Role: message.mentions.roles.first().id,
          GuildID: message.guild.id,
        });
        newData.save();
      }
    } else if (args[0] === "off") {
      const data2 = await roleData.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await roleData.findOneAndRemove({
          GuildID: message.guild.id,
        });

        return message.channel.send(`Il ruolo automatico è stato disattivato!`);
      } else if (!data2) {
        return message.channel.send(`Il ruolo automatico non è configurato!`);
      }
    }
  },
};
