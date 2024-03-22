const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const penals = require("../../../../src/schemas/penals");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const { red, green } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;
const ayar = require("../../../../src/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: [],
    name: "unbanall",
    help: "unbanall",
    owner: true,
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    message.guild.bans.fetch().then(banned => {
    let list = banned.map(user => `ID:                | Kullanıcı Adı:\n${user.user.id} | ${user.user.tag}`).join('\n');
    message.channel.send({ content:`\`\`\`js\n${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcının banı kaldırılıyor.\n\`\`\``})
    })
    message.react(green)

   const yarrak = await message.guild.bans.fetch();
   for(const sex of [...yarrak.values()]){

     const log = new EmbedBuilder()
     .setDescription(`**${sex ? sex.user.tag : sex.user.username}** adlı kullanıcının ban cezası kaldırıldı.`)
     .addFields(
       { name: "Affedilen",  value: `[${sex ? sex.user.tag : sex.user.username}](https://discord.com/users/${sex.user.id})`, inline: true },
       { name: "Affeden",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
       { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
       { name: "Ceza Sebebi",  value: `\`\`\`fix\nToplu Ban Kaldırma Affı\n\`\`\``, inline: false },
       )
     .setFooter({ text:`${moment(Date.now()).format("LLL")}` })

   message.guild.channels.cache.get(conf.banLogChannel).wsend({ embeds: [log]})

   await message.guild.members.unban(sex.user.id, `${message.author.username} tarafından kaldırıldı!`).catch(() => {});

   const data = await penals.findOne({ userID: sex.user.id, guildID: message.guild.id, type: "BAN", active: true });
   if (data) {
     data.active = false;
     await data.save();
   }
}
}}