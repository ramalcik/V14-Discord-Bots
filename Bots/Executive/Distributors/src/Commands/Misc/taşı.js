const { ChannelSelectMenuBuilder, ChannelType, PermissionsBitField, ActionRowBuilder } = require('discord.js');

module.exports = {
  conf: {
    aliases: ["taşı","tasi"],
    name: "taşı",
    help: "taşı",
    category: "yönetim",
  },

  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
      return message.reply({ content: "Yetkiniz bulunmamaktadır!" });

    const memberToMove = message.mentions.members.first();
    if (!memberToMove) 
      return message.reply({ content: 'Lütfen taşınacak üyeyi etiketleyiniz!' });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Önce sese giriniz.');

    const menu = new ActionRowBuilder()
      .addComponents(
        new ChannelSelectMenuBuilder()
          .setCustomId('members')
          .setMaxValues(1)
          .setPlaceholder('Taşımak için bir kanal seçin')
          .addChannelTypes([ChannelType.GuildVoice])
      );

    await message.channel.send({ content: `${memberToMove} kullanıcısını taşımak istediğiniz kanalı seçin:`, components: [menu] });

    client.on('interactionCreate', async interaction => {
      if (interaction.customId === 'members') {
        const selectedChannelId = interaction.values[0];

        memberToMove.voice.setChannel(selectedChannelId)
          .then(() => {
            interaction.reply({ content: 'Üye taşındı!', ephemeral: true })
              .catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
          })
          .catch(error => {
            console.error(`Üye taşınamadı: ${error}`);
            interaction.reply({ content: 'Üye taşınamadı!', ephemeral: true })
              .catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
          });
      }
    });
  },
};
