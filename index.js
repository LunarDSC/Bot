const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const mongoose = require("mongoose");
const info = require("./config/config.json");
const { token } = require("./config/bot");
const fs = require("fs");
const log = require("discord-logs");
const sug = require("./schema.js/sug");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.commandArry = [];
client.prefix = new Map();
client.snipes = new Map();

const funtionFolders = fs.readdirSync("./src/functions");
for (const folder of funtionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./src/functions/${folder}/${file}`)(client);
}

const prefixfolders = fs
  .readdirSync("./srcs/prefix")
  .filter((f) => f.endsWith(".js"));

for (arx of prefixfolders) {
  const cmd = require("./srcs/prefix/" + arx);
  client.prefix.set(cmd.name, cmd);
}

log(client, {
  debug: true,
});

client.HandlerCommand();
client.HandlerEvent();

mongoose.connect("mettete il vostro database");

mongoose.connection.on("connected", () => {
  console.log("connesso al database");
});
mongoose.connection.on("disconnected", () => {
  console.log("si è disconesso dal database");
});
mongoose.connection.on("err", (err) => {
  console.log(`Si è verificato un error:\n${err}`);
});

client.on("messageDelete", function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});

client.login(token);

client.on("messageCreate", async (message) => {
  const prefix = "?";

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const prefixcmd = client.prefix.get(command);
  if (prefixcmd) {
    prefixcmd.run(client, message, args);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === "Rules") {
    const embed = new EmbedBuilder()
      .setTitle(`⚽ | Regolamento del FantaCalcio`)
      .setDescription("Queste sono le regole del fantacalcio `2024/2025`")
      .setFields(
        { name: "1.", value: "FantaAllenatore n. 10", inline: true },
        {
          name: "2.",
          value: "Asta normale anche  quella di riparazione",
          inline: true,
        },
        {
          name: "3.",
          value:
            "Ogni squadra deve essere composta da:\n- 3 portieri\n- 8 diffensori\n- 8 centrocampisti\n- 6 attaccanti",
          inline: true,
        },
        {
          name: "4.",
          value:
            "Chi vince la COPPA DEVIS è autocamente qualificato per la Champions, nel caso vince qualcuno che ha vinto il campionato o è arrivato nelle prime 4° posizioni in quel caso verrà qualificato o il perdente della finale o verrà preso della semi-finale del torneo.",
          inline: true,
        },
        {
          name: "5.",
          value:
            "Nuovi ruoli dello staff:\n- Iachini Bruno: `Presidente`\n- Olimpieri Andrea: `Vice Presidente`\n- Galli Davide: `Sponsor`, `Editor`, `Owner`\n- Taratufolo Gioia: `Segretaria`, `post instagram`\n- Catena Andrea: `Vice del vicepresidente`\n- Psserri Luca: `Capo asta`\n- Sebastian: `Sponsor`",
          inline: true,
        },
        {
          name: "6.",
          value:
            "Per la prossima stagione nella Serie a da sponsor sarà ancora `Discordia`, mentre su EuroLeghe sarà `Seba06`",
          inline: true,
        },
        {
          name: "7.",
          value:
            "Per EuroLeghe vice ancora la regola non si possono prendere per la serie a enlive",
          inline: true,
        },
        {
          name: "8.",
          value:
            "Nuovi loghi e nuovi nomi da Serie a Tim Canino -> Serie a EnvLive Canino",
          inline: true,
        },
        {
          name: "9.",
          value:
            "Dalla prossima stagione sulle EuroLeghe (app) ci saranno tre nuove competizione:\n- Champions League (primi 4°)\n- Europa League (da 5° a 7°)\n- Conference League (da 8° a 10°)",
          inline: true,
        },
        {
          name: "10",
          value:
            "I primi 4° della champions, 5° a 7° Europa league, 8° a 10° conference league",
          inline: true,
        },
        {
          name: "11",
          value:
            "Nella serie a Enlive ogni team deve avere massimo `4` giocatori per squadra",
          inline: true,
        }
      )
      .setThumbnail(info.calcio);

    await interaction.reply({
      content: "Ti ricordiamo di rispettarle",
      embeds: [embed],
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === "Punti") {
    const embed = new EmbedBuilder()
      .setTitle(`🎖️ | Punteggi del FantaCalcio`)
      .setDescription(
        "Qui sono tutti punti che potete avere durante del corso del fantacalcio."
      )
      .setImage(info.punti)
      .setThumbnail(info.calcio);

    await interaction.reply({ embeds: [embed] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === "bot") {
    //let file;

    //file = "https://www.patreon.com/LunarDSC/shop/lunardsc-141100?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=productshare_creator&utm_content=join_link";

    const embed = new EmbedBuilder()
      .setTitle("🤖 | **__File del bot__**")
      .setDescription(
        "Se trovate difficoltà come funziona basta aprire un ticket"
      )
      .setFields({
        name: "__Link__:",
        value: `${info.bot}`,
      });

    await interaction.reply({ embeds: [embed] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === "command") {
    //let file;

    //file = "https://www.patreon.com/LunarDSC/shop/custom-command-141092?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=productshare_creator&utm_content=join_link";

    const embed = new EmbedBuilder()
      .setTitle("📝 | **__Commandi Custom__**")
      .setDescription(
        "Se trovate difficoltà come funziona basta aprire un ticket"
      )
      .setFields({
        name: "__Link__:",
        value: `${info.file}`,
      });

    await interaction.reply({ embeds: [embed] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === "mercato") {
    /*
    let fanta, doc, buy;

    fanta = "prova";
    doc = "prova";
    buy = "prova";

    const embed = new EmbedBuilder()
      .setTitle("🛒 | **__Negozio__**")
      .setDescription("Se trovate difficoltà come funziona basta aprire un ticket")
      .setFields(
        {
          name: "__Commado del fantacalcio__:",
          value: `${fanta}`,
        },
        {
          name: "__Commando dei progetti__:",
          value: `${doc}`,
        },
        {
          name: "__Commando del shopping__:",
          value: `${buy}`,
        }
      );

*/
    await interaction.reply({ content: "IN ARRIVO" });
  }
});

client.distube = new DisTube(client, {
  leaveOnFinish: true,
  searchCooldown: 10,
  leaveOnEmpty: false,
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
      new SpotifyPlugin({
          emitEventsAfterFetching: true
        }),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
  ]
});

const status = queue =>
  `Volume: \`${queue.volume}%\` |  Filter: \`${queue.filters.names.join(', ') || 'Inactive'}\` | Repeat: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Track') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
      queue.textChannel.send({
          embeds: [new EmbedBuilder().setColor('#a200ff')
              .setDescription(`🎶 | Playing: \`${song.name}\` - \`${song.formattedDuration}\`\nFrom: ${song.user
                  }\n${status(queue)}`)]
      })
  )
  .on('addSong', (queue, song) =>
      queue.textChannel.send(
          {
              embeds: [new EmbedBuilder().setColor('#a200ff')
                  .setDescription(`🎶 | Added \`${song.name}\` - \`${song.formattedDuration}\` to queue by: ${song.user}`)]
          }
      )
  )
  .on('addList', (queue, playlist) =>
      queue.textChannel.send(
          {
              embeds: [new EmbedBuilder().setColor('#a200ff')
                  .setDescription(`🎶 | Added from \`${playlist.name}\` : \`${playlist.songs.length
                      } \` queue tracks; \n${status(queue)}`)]
          }
      )
  )
  .on('error', (channel, e) => {
      if (channel) channel.send(`⛔ | Error: ${e.toString().slice(0, 1974)}`)
      else console.error(e)
  })
  .on('empty', channel => channel.send({
      embeds: [new EmbedBuilder().setColor("Red")
          .setDescription('⛔ | The voice channel is empty! Leaving the channel...')]
  }))
  .on('searchNoResult', (message, query) =>
      message.channel.send(
          {
              embeds: [new EmbedBuilder().setColor("Red")
                  .setDescription('`⛔ | No results found for: \`${query}\`!`')]
          })
  )
  .on('finish', queue => queue.textChannel.send({
      embeds: [new EmbedBuilder().setColor('#a200ff')
          .setDescription('🏁 | The queue is finished!')]
  }))
