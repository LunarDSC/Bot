const canvafy = require("canvafy");

const color = require('../../config/color.json');

module.exports = {
  name: "ship",

  run: async (client, message, args) => {
    let member = message.mentions.members.first();

    if (!member) {
      return message.reply({ content: "Perfavore il tag [es. !ship @nome]" });
    } else if (member.id === message.author.id) {
      return message.reply({
        content: "Perfavore menzionare il membro giusto",
      });
    }

    const love = await new canvafy.Ship()
      .setAvatars(
        message.author.displayAvatarURL({
          forceStatic: true,
          extension: "png",
        }),
        member.user.displayAvatarURL({ forceStatic: true, extension: "png" })
      )
      .setBackground("image", "https://crew-center.com/sites/default/files/cruise-ship-love.jpg")
      .setBorder(color.white)
      .setOverlayOpacity(0.5)
      .build();

    message.reply({
      files: [{ attachment: love, name: `ship-${message.author.id}.png` }],
    });
  },
};
