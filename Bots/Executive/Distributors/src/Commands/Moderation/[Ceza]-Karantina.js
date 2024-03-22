const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const { red, green, Revuu, kirmiziok } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
const ceza = require("../../../../src/schemas/ceza");
const cezapuan = require("../../../../src/schemas/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["karantina"],
    name: "karantina",
    help: "karantina <papaz/ID> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Yeterli yetkin bulunmuyor!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.reply({ embeds: [new EmbedBuilder()
   //   .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bir üye belirtmelisin!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    message.react(red) 
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten jailde!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!"));
    if (!member.manageable) return message.reply({ embeds: [new EmbedBuilder()
    //  .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Bu üyeyi jailleyemiyorum!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (allah.Main.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == allah.Main.jaillimit) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
 //     .setAuthor({ name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail()
      .setDescription(`${red} Saatlik jail sınırına ulaştın!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
 
    member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)

    message.react(green)
    const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason);
    message.reply({ content :`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (allah.Main.dmMessages) member.send({ content :`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`}).catch(() => {});
    

const log = new EmbedBuilder()
.setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcısı **${message.author.tag}** tarafından Karantina atıldı.`)
.addFields(
  { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
  { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
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
  },
};