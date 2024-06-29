const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const color = require('../../../config/color.json')
const info = require('../../../config/desc.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-mc')
    .setDescription('informazione per entrare nel server di minecraft'),
    async execute (interaction, client) {
        

        const embed = new EmbedBuilder()
        .setColor(color.a)
        .setDescription(info.i)
        .addFields(
            { name: 'IP:', value: 'DiscordiaCraft.aternos.me', inline: true },
            { name: 'Versione:', value: '__1.20.4__ **-** __1.20.6__', inline: true},
            { name: 'WhiteList:', value: '**ATTIVA**', inline: true },
            { name: 'Tipo:', value: '_Craccato/Premium_', inline: true}
        )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('nw')
            .setLabel('Nuovo server in arrivo')
            .setStyle(ButtonStyle.Danger)
        )
        

        return await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }
}