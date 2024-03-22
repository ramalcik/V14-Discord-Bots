const { PermissionsBitField, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const moment = require("moment");
const ceza = require("../../../../src/schemas/ceza");
const cezapuan = require("../../../../src/schemas/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green, jail } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["jail","temp-jail"],
    name: "jail",
    help: "jail <papaz/ID> <Süre> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    const redemoji = client.emojis.cache.find(x => x.name === "red");
    message.react(redemoji)
    message.reply({ embeds: [new EmbedBuilder()
  //    .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Yeterli yetkin bulunmuyor!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const redemoji = client.emojis.cache.find(x => x.name === "red");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(redemoji) 
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Bu üye zaten jailde!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(redemoji) 
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    if (!member.manageable) return message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Bu üyeyi jailleyemiyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    if (allah.Main.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == allah.Main.jaillimit) 
    {
    message.react(redemoji)
    message.reply({ embeds: [new EmbedBuilder()
     // .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${redemoji} Saatlik jail sınırına ulaştın!`)
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
            .setCustomId('jail')
            .setPlaceholder(`Ceza türünü seçmek için tıkla!`)
            .addOptions([
            { 
              label: "Cinsellik, taciz ve ağır hakaret",
              value: "jail1",
              description: "1 Gün",

    
            },
            { 
              label: "Sunucu kurallarına uyum sağlamamak",
              value: "jail2",
              description: "2 Gün",

  
            },
            { 
              label: "Sesli/Mesajlı/Ekran P DM Taciz",
              value: "jail3",
              description: "2 Gün",

  
            },
            { 
              label: "Dini Irki ve Siyasi değerlere Hakaret",
              value: "jail4",
              description: "2 Gün",

  
            },
            { 
              label: "Abartı rahatsız edici yaklaşımda bulunmak",
              value: "jail6",
              description: "7 Gün",

  
            },
            { 
              label: "Sunucu içerisi abartı trol / Kayıt trol yapmak",
              value: "jail5",
              description: "8 Gün",

  
            },
            { 
              label: "Sunucu Kötüleme / Saygısız Davranış",
              value: "jail7",
              description: "7 Gün",

  
            },
            { 
              label: "Menü Kapatmak",
              value: "jail8",
              description: "İptal Menüsü",
  
            },
             ]),
    );

const duration = args[1] ? ms(args[1]) : undefined;

if (duration) {
  const reason = args.slice(2).join(" ") || "Belirtilmedi!";

  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});

  await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
  const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
  if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
  member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
  const green = client.emojis.cache.find(x => x.name === "green");
  message.react(green) 
  const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);
  if(msg) msg.delete();
  await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
  if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});
  
  message.react(green)
  const log = new EmbedBuilder()
  .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
  .addFields(
    { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
    { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
    { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
    { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
    )
  .setFooter({ text:`${moment(Date.now()).format("LLL")} (Ceza ID: #${penal.id})` })
  
  message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

  if(!message.member.permissions.has(PermissionsBitField.Flags.AddReactions) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
    if (allah.Main.jaillimit > 0) {
      if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
      else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }}
} else if (!duration) {var papaz = new EmbedBuilder()
.setDescription(`${message.author} Merhaba ${member.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde Vermek İstediginz Ceza Türünü Aşagıdan Seçiniz`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setColor("Random")
}
let msg = await message.reply({ embeds: [papaz], components : [row],});


if (msg) {
var filter = (xd) => xd.user.id === message.author.id;
let collector =  msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })
    
collector.on("collect", async (interaction) => {

if(interaction.values[0] === "jail1") {
await interaction.deferUpdate();
const duration = "1w" ? ms("1w") : undefined;
const reason = "Cinsellik, taciz ve ağır hakaret";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});

await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);
if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail2") {
await interaction.deferUpdate();
const duration = "3d" ? ms("3d") : undefined;
const reason = "Sunucu kurallarına uyum sağlamamak";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});

await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail3") {
await interaction.deferUpdate();
const duration = "1d" ? ms("1d") : undefined;
const reason = "Sesli/Mesajlı/Ekran P. DM Taciz";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});

await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has('ADMINISTRATOR') && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail4") {
await interaction.deferUpdate();
const duration = "4w" ? ms("4w") : undefined;
const reason = "Dini, Irki ve Siyasi değerlere Hakaret";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});

await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has('ADMINISTRATOR') && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail5") {
await interaction.deferUpdate();
const duration = "2w" ? ms("2w") : undefined;
const reason = "Abartı rahatsız edici yaklaşımda bulunmak!";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has('ADMINISTRATOR') && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail6") {
await interaction.deferUpdate();
const duration = "3d" ? ms("3d") : undefined;
const reason = "Sunucu içerisi abartı trol / Kayıt trol yapmak!";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has('ADMINISTRATOR') && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail7") {
await interaction.deferUpdate();
const duration = "4w" ? ms("4w") : undefined;
const reason = "Sunucu Kötüleme / Saygısız Davranış";

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
message.react(green)
const penal = await client.penalize(message.guild.id, member.user.id, "TEMP-JAIL", true, message.author.id, reason, true, Date.now() + duration);

if(msg) msg.delete();
interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar jaillendiniz.`}).catch(() => {});

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
  { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now() + duration) / 1000)}:R>`, inline: true },
  { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
  )
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});

if(!message.member.permissions.has('ADMINISTRATOR') && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (allah.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
}

if(interaction.values[0] === "jail8") {
await interaction.deferUpdate();
if(msg) msg.delete();
interaction.followUp({ content: `${green} Jail Atma işlemi başarıyla iptal edildi.`, ephemeral: true });
}
})
}
  },
};

