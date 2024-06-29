module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    if (
      message.content.includes("nudes") |
      message.content.includes("Nudes") |
      message.content.includes("Only") |
      message.content.includes("fan")
    ) {
      message.delete();

      message.channel.send({
        content: `${message.author} verrai subito segnalato con sanzioni soft o gravi.`,
      });
    }

    if (
      message.content.includes("cazzo") |
      message.content.includes("stronzo") |
      message.content.includes("vaffanculo") |
      message.content.includes("Cazzo") |
      message.content.includes("Stronzo") |
      message.content.includes("Vaffanculo") |
      message.content.includes("gay") |
      message.content.includes("Gay")
    ) {
      message.delete();

      message.channel.send({
        content: `${message.author} hai scritto una parola non rispetta le regole.`,
      });
    }
  },
};
