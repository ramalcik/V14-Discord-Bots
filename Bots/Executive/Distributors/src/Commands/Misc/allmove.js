const { MessageFlags, PermissionsBitField, ActionRowBuilder, ChannelSelectMenuBuilder, addChannelTypes, ChannelType } = require("discord.js");
const {red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["toplutaşı","allmove"],
    name: "toplutaşı",
    help: "toplutaşı",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({ embeds: [embed.setDescription(`Yetkin Bulunmamakta!`)] }).then((e) => setTimeout(() => { e.delete(); }, 5000));

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Önce sese gir amk cocu');

    if (voiceChannel && voiceChannel.members.size === 1) return message.reply(`Olduğun kanalda kimse yok amk`)

    const menu = new ActionRowBuilder().addComponents(
new ChannelSelectMenuBuilder()
      .setCustomId('move-members')
.setMaxValues(1)
      .setPlaceholder('Taşımak için bir kanal seçin')
.addChannelTypes(ChannelType.GuildVoice)
  )
 await message.channel.send({ components: [menu], content: `Taşımak istediğin kanalı seç oç`})


 client.on('interactionCreate', async interaction => {
  if (interaction.customId === 'move-members') {
    const voiceChannel = interaction.member.voice.channel;

    const selectedChannelId = interaction.values[0];
    const membersToMove = voiceChannel.members;

    membersToMove.forEach(member => {
      member.voice.setChannel(selectedChannelId)
    });

        interaction.reply({ content: 'Üyeler taşındı!', ephemeral: true })
          .catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
      }
    });
  }
}