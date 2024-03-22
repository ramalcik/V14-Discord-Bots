const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { MessageActionRow, MessageButton, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const settings = require('../../../../src/configs/sunucuayar.json');
const ayar = require('../../../../../../config.json');
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: 'giriş',
    help: 'giriş',
    category: 'sahip',
    owner: true,
  },

  run: async (client, message, args) => {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('kabul')
        .setLabel("Erkek")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('kabul_rol')
        .setLabel("Kız")
        .setStyle(ButtonStyle.Secondary)
    );

    await message.channel.send({
      content: `
Merhaba! **${message.guild.name}**'a hoş geldiniz :grey_exclamation:
Sunucumuz **Sövüş/İfşa** ve birçok discord'un insanlara bıraktığı kötü alışkanlıklardan uzak bir privdir.
Güzel arkadaşlıklar edinip **Sohbet, Müzik, Oyun** oynayabilirsiniz

:exclamation: Tek kuralımız kötü alışkanlıklardan uzak durmanızdır.
`,
      components: [row],
    });
  },
};

client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === 'kabul') {
    const modal = new ModalBuilder()
      .setCustomId('grs')
      .setTitle(`${client.guilds.cache.get(ayar.GuildID).name} WELCOME`)
      const ramal31 = new TextInputBuilder()
          .setCustomId('isim')
          .setLabel('İsim veya Nickname')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(2)
          .setMinLength(2)
          .setPlaceholder("İsim ve yaşınızı giriniz. Örn: ramal 20")
      
          const AOne = new ActionRowBuilder().addComponents(ramal31);
  
          modal.addComponents(AOne);
          await interaction.showModal(modal);

    } else if (interaction.customId === 'kabul_rol') {
    const modal = new ModalBuilder()
      .setCustomId('grs_rol')
      .setTitle(`${client.guilds.cache.get(ayar.GuildID).name} WELCOME + ROL`)
      const ramal311 = new TextInputBuilder()
          .setCustomId('isim')
          .setLabel('İsim veya Nickname')
          .setStyle(TextInputStyle.Paragraph)
          .setMinLength(2)
          .setMinLength(2)
          .setPlaceholder("İsim ve yaşınızı giriniz. Örn: ramal 20")
      
          const AOnee = new ActionRowBuilder().addComponents(ramal311);
  
          modal.addComponents(AOnee);
          await interaction.showModal(modal);

    }


client.on('modalSubmit', async (modal) => {
const guild = client.guilds.cache.get(ayar.GuildID);
const channelName = 'priv_log'; 

const LogChannel = guild.channels.cache.find(channel => channel.name === channelName); 

  if (modal.customId === 'grs') {
    const reg = modal.getTextInputValue('isim');
    if (reg) {
      await modal.member.setNickname(reg);
      await modal.member.roles.add(settings.erkekRolleri);
      if (modal.member.roles.cache.has(settings.kizRolleri)) {
        await modal.member.roles.remove(settings.kizRolleri
      );
      }
      await LogChannel.send({
        content: `${modal.user} üyesi ${client.guilds.cache.get(ayar.GuildID).name}'a katıldı ve roller güncellendi.`,
      });

    }
  } else if (modal.customId === 'grs_rol') {
    const reg = modal.getTextInputValue('isim');
    if (reg) {
      await modal.member.setNickname(reg);
      await modal.member.roles.add(
        settings.kizRolleri);
      if (modal.member.roles.cache.has(settings.erkekRolleri)) {
        await modal.member.roles.remove(

        settings.erkekRolleri);
      }
      await LogChannel.send({
        content: `${modal.user} üyesi ${client.guilds.cache.get(ayar.GuildID).name}'a katıldı ve roller güncellendi.`,
      });
    }
  }
})
}
)
