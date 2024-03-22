const { PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green,nokta } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const emojis = require("../../../../../../emojiName.json")
module.exports = {
  conf: {
    aliases: ["seslisay","sesli"],
    name: "seslisay",
    help: "seslisay",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
{
  message.react(message.guild.emojiGöster(emojis.red)) 
  return
}
    let members = message.guild.members.cache.filter(m => m.voice.channelId);

    let tag = conf.tag;
    let pubID = conf.publicParents;

    let topses = message.guild.members.cache.filter(s => s.voice.channel);
    let tagses = topses.filter(s => s.user.username.includes(tag));

    let yayın = topses.filter(s => s.voice.streaming);
    let mik = topses.filter(s => s.voice.selfMute).size;
    let kulak = topses.filter(s => s.voice.selfDeaf).size;
    let bot = topses.filter(s => s.user.bot);
    let count = 1;
    let topCategory = message.guild.channels.cache.filter(s => s.type === 'category').sort((a, b) => Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentId === b.id).size - Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentId === a.id).size))).map((c, index) => `${count++}. \`#${c.name}\`: \`${c.members.filter(s => s.voice.channel && s.voice.channel.parentId === c.id).size}\``).splice(0, 3).join('\n');
    let yetkili = message.guild.members.cache.filter(x => {
      return x.user.username.includes(conf.tag) && x.voice.channel && x.roles.cache.has(conf.ekipRolu)
  }).size

    embed.setDescription(`
${green} Sesli kanallarda toplam **${topses.size}** kişi var !

${nokta} Public odalarda **${members.filter(m => pubID.includes(m.voice.channel.parentId)).size}** kişi var !
${nokta} Ses kanallarında **${tagses.size}** taglı kullanıcı var !
${nokta} Ses kanallarında **${yetkili}** yetkili var !

${nokta} Ses kanallarında **${yayın.size}** kişi yayın yapıyor !
${nokta} Mikrofonu kapalı: **${mik}**
${nokta} Kulaklığı kapalı: **${kulak}**

${nokta} **Top 3 kategori sırası;**
${nokta || 'Boş'}
`)


    message.channel.send({ embeds: [embed]})
}
}

