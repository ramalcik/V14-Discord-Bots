
const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["lock"],
    name: "lock",
    help: "lock",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
      return message.reply({ embeds: [embed.setDescription(`Yetkin Bulunmamakta!`)] })
             .then((e) => setTimeout(() => { e.delete(); }, 5000));

    const menu = new ActionRowBuilder().addComponents(
      new ChannelSelectMenuBuilder()
        .setCustomId('move-members')
        .setMaxValues(1)
        .setPlaceholder('Kilitlemek istediğin kanalı seç!')
        .addChannelTypes(ChannelType.GuildText)
    );
    
    await message.channel.send({ components: [menu], content: `Kilitlemek Istedigin Kanali Sec!`});

    client.on('interactionCreate', async interaction => {
      if (interaction.customId === 'move-members') {
        let channelToLock = interaction.values[0];
        let targetChannel = interaction.guild.channels.cache.get(channelToLock);

        if (!targetChannel) return interaction.reply({ content: 'Kanal bulunamadı!', ephemeral: true });

        // Kanalın kilidini kontrol et
        if (targetChannel.permissionsFor(interaction.guild.roles.everyone).has(PermissionsBitField.Flags.SendMessages)) {
          await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: false
          });
          interaction.reply({ content: 'Kanal Kitlendi!', ephemeral: true }).catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
        } else {
          await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: true
          });
          interaction.reply({ content: 'Kanal Açıldı!', ephemeral: true }).catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
        }
      }
    });
  }
};
