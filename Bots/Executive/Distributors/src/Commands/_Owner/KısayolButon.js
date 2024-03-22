const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const messageUser = require("../../../../src/schemas/messageUser");
const voiceUser = require("../../../../src/schemas/voiceUser");
const voiceUserParent = require("../../../../src/schemas/voiceUserParent");
const inviterSchema = require("../../../../src/schemas/inviter");
const inviteMemberSchema = require("../../../../src/schemas/inviteMember");
const nameData = require("../../../../src/schemas/names")
const allah = require("../../../../../../config.json");
const ayarlar = require("../../../../src/configs/sunucuayar.json")
const { yetkili,gorevli,basvuru,nokta  } = require("../../../../src/configs/emojis.json")
const conf = require("../../../../src/configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    help: "buttonpanel",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    const bpanelrow = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('kısayollar')
            .setPlaceholder(`Kısayolları Görmek İçin Tıkla`)
            .addOptions([
                { label: 'Sunucu Giriş',description: 'Sunucuya Giriş Tarihinizi Öğrenin.', value: 'I', },
                { label: 'Hesap Açılış',description: 'Hesabınızın Açılış Tarihini Öğrenin.', value: 'III', },
                { label: 'Rolleriniz',description: 'Üzerinizde Bulunan Rollerin Listesini Atar.', value: 'II', },
                { label: 'Aktiflik',description: 'Sunucudaki Anlık Aktif Listesini Görüntüleyin.', value: 'VI', },
                { label: 'Davet Stat',description: 'Sunucudaki Davet Bilgilerinizi Görüntüleyin.', value: 'IV', },
                { label: 'Mesaj Stat',description: 'Sunucudaki Mesaj Bilgilerinizi Görüntüleyin.', value: 'VIII',},
                { label: 'Ses Stat',description: 'Sunucudaki Ses Bilgilerinizi Görüntüleyin.', value: 'IX', },
                { label: 'İsim Geçmişi',description: 'Önceki İsim Bilgilerinizi Öğrenin.', value: 'VII',},
             ]),
    );

    const plpanel = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("sorun")
        .setEmoji("1194013359100661852")
        .setLabel("Sorun Bildir")
        .setStyle(ButtonStyle.Secondary),
        
      new ButtonBuilder()
        .setCustomId("oneri")
        .setEmoji("1206592548571848704")
        .setLabel("Öneri İlet")
        .setStyle(ButtonStyle.Secondary),
  
        new ButtonBuilder()
        .setCustomId("ybasvuru")
        .setEmoji("1206592578431094814")
        .setLabel("Yetkili Başvurusu")
        .setStyle(ButtonStyle.Secondary),
  
  
    );

let papaz = new EmbedBuilder()
.setDescription(`Sunucu İçi Bilgilerinizi Botun Komutlarını Ve Diğer Herşeyi Buradan Öğrenebilirsiniz`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [papaz], components : [ bpanelrow,plpanel],})

  },
};

client.on('interactionCreate', async interaction => {
  
    if (!interaction.isSelectMenu()) return;

    const member = interaction.user;
    const inviterData = await inviterSchema.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: allah.GuildID, inviter: interaction.user.id });
    const daily = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const tagged = invMember ? interaction.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(ayarlar.tag)).size : 0;
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const data = await nameData.findOne({ guildID: allah.GuildID, userID: member.id });
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const messageData = await messageUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
    const voiceData = await voiceUser.findOne({ guildID: allah.GuildID, userID: interaction.user.id });
    
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: allah.GuildID, userID: member.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////
    

if(interaction.values[0] === "I")
{
await interaction.reply({ content: `**Sunucuya Giriş Tarihiniz :** <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)`, ephemeral: true });
}

if(interaction.values[0] === "II")
{
await interaction.reply({ content: `**Üzerinde Bulunan Rollerin Listesi ;**
        
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`, ephemeral: true });
}

if(interaction.values[0] === "III")
{
await interaction.reply({ content: `**Hesabınız** <t:${Math.floor(member.createdTimestamp / 1000)}>  (<t:${Math.floor(member.createdTimestamp / 1000)}:R>) **Tarihinde Açılmış**`, ephemeral: true });
}

if(interaction.values[0] === "IV")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm İnvite İstatislikleriniz Aşağıda Belirtilmiştir.
\`•\` **Toplam** \`${regular}\` **Davetin Bulunmakta.**

\`•\` \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
\`•\` \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`, ephemeral: true });
}

if(interaction.values[0] === "V")
{
await interaction.guild.members.cache.get(member.id).roles.cache.has(conf.boosterRolu) ? interaction.guild.members.cache.get(member.id).roles.set([conf.boosterRolu, conf.unregRoles[0]]) : interaction.guild.members.cache.get(member.id).roles.set(conf.unregRoles)
await interaction.reply({ content: `${member.toString()} üyesi başarıyla kayıtsıza atıldı!`, ephemeral: true });
}

if(interaction.values[0] === "VI")
{
await interaction.reply({ content: `
\`•\` **Sesli Kanallardaki Toplam Üye Sayısı :** \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\`
\`•\` **Sunucudaki Toplam Üye Sayısı :** \`${(interaction.guild.memberCount)}\`
\`•\` **Sunucunun Oluşturulma Tarihi :** \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
\`•\` **Sunucu Destek/Id Numarası :** \`${(interaction.guild.id)}\`
`, ephemeral: true });
}

if(interaction.values[0] === "VII")
{
const ambed = new EmbedBuilder()
.setAuthor({ name: `${member.username} üyesinin isim bilgileri;`})
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setDescription(data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` \` ${x.name} \` ${x.sebep ? `(${x.sebep})` : ""} ${x.rol ? `(${x.rol})` : ""} ${x.yetkili ? `(<@${x.yetkili}>)` : ""} <t:${Math.floor(x.date / 1000)}:R>`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")         
await interaction.reply({ embeds: [ambed], ephemeral: true });
}

if(interaction.values[0] === "VIII")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm Mesaj İstatislikleriniz Aşağıda Belirtilmiştir.

**Mesaj İstatistiği**
\`•\` Toplam: \`${messageData ? messageData.topStat : 0}\`

\`•\` Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
\`•\` Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, ephemeral: true });
}

if(interaction.values[0] === "IX")
{
await interaction.reply({ content: `
${member.toString()}, <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Sunucumuzda Yapmış Olduğunuz Tüm Ses İstatislikleriniz Aşağıda Belirtilmiştir.

**Sesli Sohbet İstatistiği**
\`•\` Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

\`•\` Haftalık Ses: \`${voiceWeekly}\`
\`•\` Günlük Ses: \`${voiceDaily}\`
`, ephemeral: true });
}
if (!interaction.isSelectMenu()) return;





});