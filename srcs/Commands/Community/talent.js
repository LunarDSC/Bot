const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const color = require('../../../config/color')
const info = require('../../../config/config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('talent-show')
    .setDescription('indicazioni per partecipare'),
    async execute (interaction) {

        

        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel('📃 | iscrizione')
            .setURL('https://dyno.gg/form/68713d16')
            .setStyle(ButtonStyle.Link)
        )

        const embed = new EmbedBuilder()
        .setTitle('💫 𝐓𝐚𝐥𝐞𝐧𝐭 𝐒𝐡𝐨𝐰 💫')
        .setDescription(`- Come funziona basta contattare in privato lui: **${info.name}** se siete in un altro server.\n- Nel mentre siete nel server giusto vi basta compilare il modulo.`)
        .setColor(color.random)
        .setThumbnail(info.talent)
        .addFields(
            { name: 'Posti disponibili:', value: '**0/20**'},
            { name: 'Giudici', value: '**1/3**'}
        )
        .addFields(
            { name: 'Privacy', value: `${info.privacy}`},
            { name: 'Ticket', value: "Il ticket dovrà aperto solo nel server che viene fatto l'evento"}
        )

        await interaction.reply({ content: '**IN FASE DI ORGANIZZAZIONE**', embeds: [embed], components: [row] })
    }
}