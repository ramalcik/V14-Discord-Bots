const { EmbedBuilder, AuditLogEvent } = require("discord.js")
const { red, green } = require("../../../src/configs/emojis.json")
const Log = require("../../../src/configs/sunucuayar.json")
const roller = require("../../../src/schemas/rolveridb")
var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  await newMember?.guild.fetchAuditLogs({
    type: AuditLogEvent.MemberRoleUpdate
  }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    if (yapan.bot) return
    newMember.roles.cache.forEach(async role => {
      if (!oldMember.roles.cache.has(role.id)) {

        const emed = new EmbedBuilder()
          .setDescription(`
          Kişinin eklenen ve alınan tüm rollerine bakmak için \`.rollog @ramal\` komutunu kullanın
          
          **Rol Eklenen kişi**
          ${hedef} - [\`${hedef.id}\`] 

          **Rolü Ekleyen Kişi**
          ${yapan} - [\`${yapan.id}\`] 
  
          **Eklenen Rol**
          ${role} - [\`${role.id}\`]`)
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name == "role_log").send({ embeds: [emed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
    oldMember.roles.cache.forEach(async role => {
      if (!newMember.roles.cache.has(role.id)) {
        const emeed = new EmbedBuilder()
        .setDescription(`
        Kişinin eklenen ve alınan tüm rollerine bakmak için \`.rollog @ramal\` komutunu kullanın

        **Rol Alınan kişi**
        ${hedef}  - [\`${hedef.id}\`] 

        **Rolü Alan Kişi**
        ${yapan} - [\`${yapan.id}\`]
        
        **Alınan Rol**
        ${role} - [\`${role.id}\`]`)
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name == "role_log").send({ embeds: [emeed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
  })
}
module.exports.conf = {
  name: "guildMemberUpdate",
};