const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { red, green } = require("../../../../src/configs/emojis.json")
const ceza = require("../../../../src/schemas/ceza");
const cezapuan = require("../../../../src/schemas/cezapuan")
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const moment = require("moment");
moment.locale("tr");
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["ads","reklam","reklamcı","reklam-bildir"],
    name: "ads",
    help: "ads",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.guild) return;

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!args[0]) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }

    message.reply({ content: `Kanıt için ekran görüntüsünü atınız. 2 dakika süreniz var, atılmazsa işlem iptal edilecek.Selfie ni atma kanka seni banlarım`})
    .then(() => {
      message.channel.awaitMessages({
        filter: (m) => m.member.id === message.author.id,
        max: 1,
        time: 120000
      }).then(async x => {

        if (!x.first().attachments.first()) { message.channel.send({ content:"Lütfen sadece ekran görüntüsü atınız."}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        return }

        const reason = "Reklam";
        await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
        await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
        await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
        await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
        const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
        if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
     
        member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.jailRole[0]]) : member.roles.set(conf.jailRole)
    
        const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason);
        message.reply({ content :`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle jaillendi! \`(Ceza ID: #${penal.id})\``});
        if (allah.Main.dmMessages) member.send({ content :`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`}).catch(() => {});
        
          const log = new EmbedBuilder()
          .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Jail atıldı.`)
          .addFields(
            { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
            { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
            { name: "Ceza Tarihi",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
            { name: "Ceza Sebebi",  value: `\`\`\`fix\nReklam\n\`\`\``, inline: false },
            )
          .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
          .setImage(x.first().attachments.first().proxyURL)
          message.guild.channels.cache.get(conf.jailLogChannel).wsend({ embeds: [log]});
        }).catch(err => message.reply({ content :`${red} 2 dakika içerisinde kanıt ekran görüntüsü atılmadığı için iptal edildi.`}));
      });
    
    },
};