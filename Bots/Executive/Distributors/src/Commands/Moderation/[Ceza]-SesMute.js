const { PermissionsBitField, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const ceza = require("../../../../src/schemas/ceza");
const cezapuan = require("../../../../src/schemas/cezapuan")
const vmuteLimit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green, vmute } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["vmute","voicemute"],
    name: "vmute",
    help: "vmute <papaz/ID> <Süre> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin bulunmuyor!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    if (conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten susturulmuş!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bu üyeyi susturamıyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    if (allah.Main.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == allah.Main.voicemutelimit) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Saatlik susturma sınırına ulaştın!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

    const yazı = [] 
    if(member.user.username.length > 15) {
    let yarrak = member.user.username.slice(0, 15)
      yazı.push(`${yarrak}...`)  
    } else {
      yazı.push(`${member.user.tag}`)
    }

    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('vmute')
            .setPlaceholder(`Ceza türünü seçmek için tıkla!`)
            .addOptions([
                { 
                  label: "Kışkırtma, Trol ve Dalgacı Davranış",
                  value: "vmute1",
                  description: "5 Dakika",
                  emoji: vmute
        
                },
                { 
                  label: "Özel Odalara İzinsiz Giriş ve Trol",
                  value: "vmute2",
                  description: "1 Saat",
                  emoji: vmute
        
                },
                { 
                  label: "Küfür Argo Hakaret ve Rahatsız Edici Davranış",
                  value: "vmute3",
                  description: "5 Dakika",
                  emoji: vmute
        
                },
                { 
                  label: "Abartı Küfür ve Taciz Kullanımı",
                  value: "vmute4",
                  description: "30 Dakika",
                  emoji: vmute
        
                },
                { 
                  label: "Dini Irki ve Siyasi değerlere Hakaret",
                  value: "vmute5",
                  description: "2 Hafta",
                  emoji: vmute
        
                },
                { 
                  label: "Sunucu Kötüleme ve Kişisel Hakaret",
                  value: "vmute6",
                  description: "1 Saat",
                  emoji: vmute
        
                },
                { 
                  label: "Soundpad Bass gibi Uygulama Kullanmak",
                  value: "vmute7",
                  description: "30 Dakika",
                  emoji: vmute
        
                },
                { 
                  label: "Menü Kapatmak",
                  value: "vmute8",
                  description: "İptal Menüsü",
                  emoji: red
      
                },
             ]),
    );

    const duration = args[1] ? ms(args[1]) : undefined;
 
    if (duration) {
      const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
      await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
      const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
      if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
      member.roles.add(conf.voiceMute);
      if (member.voice.channelId && !member.voice.serverMute) {
        member.voice.setMute(true);
        member.roles.add(conf.voiceMute);
      }
      const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
      message.react(green)
      if(msg) msg.delete();
      await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
       message.react(green)
      if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});
  
      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
      .addFields(
        { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
        { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
        { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
      message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
   
      if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
        if (allah.Main.voicemutelimit > 0) {
          if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
          else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
          setTimeout(() => {
            if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
          }, 1000 * 60 * 60);
        }}
    } else if (!duration) {
      var papaz = new EmbedBuilder()
      .setDescription(`${message.author} Merhaba ${member.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde Vermek İstediginz Ceza Türünü Aşagıdan Seçiniz`)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setColor("Random")
      }
      let msg = await message.reply({ embeds: [papaz], components : [row],});    
    if (msg) {
    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })
        
    collector.on("collect", async (interaction) => {
    
    if(interaction.values[0] === "vmute1") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Kışkırtma, Trol ve Dalgacı Davranış";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute2") {
    await interaction.deferUpdate();
    const duration = "1h" ? ms("1h") : undefined;
    const reason = "Özel Odalara İzinsiz Giriş ve Trol";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute3") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }

    if(interaction.values[0] === "vmute4") {
    await interaction.deferUpdate();
    const duration = "30m" ? ms("30m") : undefined;
    const reason = "Abartı, Küfür ve Taciz Kullanımı";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute5") {
    await interaction.deferUpdate();
    const duration = "2w" ? ms("2w") : undefined;
    const reason = "Dini, Irki ve Siyasi değerlere Hakaret";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute6") {
    await interaction.deferUpdate();
    const duration = "1h" ? ms("1h") : undefined;
    const reason = "Sunucu Kötüleme ve Kişisel Hakaret";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute7") {
    await interaction.deferUpdate();
    const duration = "30m" ? ms("30m") : undefined;
    const reason = "Soundpad, Bass gibi Uygulama Kullanmak";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { VoiceMuteAmount: 1 } }, {upsert: true});
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({content:`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    member.roles.add(conf.voiceMute);
    if (member.voice.channelId && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    if(msg) msg.delete();
    await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
     message.react(green)
    if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar **sesli kanallarda** susturuldunuz.`}).catch(() => {});

    const log = new EmbedBuilder()
    .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcıya **${message.author.tag}** tarafından Ses Mutesi atıldı.`)
    .addFields(
      { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
      { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
      { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
      { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
      )
    .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [log]});
 
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
      if (allah.Main.voicemutelimit > 0) {
        if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
        else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }}
    }
    
    if(interaction.values[0] === "vmute8") {
    await interaction.deferUpdate();
    if(msg) msg.delete();
    interaction.followUp({ content: `${green} Sesli Susturma işlemi başarıyla iptal edildi.`, ephemeral: true });
    }
    })
    }
      },
    };

