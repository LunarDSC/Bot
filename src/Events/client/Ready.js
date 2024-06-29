const { ActivityType } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} è pronto`);

    const activities = [`⚙️ | Lista commandi: !help`, `✅ | Hosting: plutonode.com`, `🟢 | ONLINE`];

    setInterval(() => {
      const status = activities[Math.floor(Math.random() * activities.length)];
      client.user.setPresence({
        activities: [{ name: `${status}`, type: ActivityType.Custom }],
        status: "on",
      });
    }, 5000);
  },
};
