const { EmbedBuilder } = require('discord.js');
const conf = require('../../../../../../config.json')
const guardSchema = require("../../../../../Protection/src/Models/Safe") 
const roleGuardSchema = require("../../../../../Protection/src/Models/Role"); 
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
module.exports = {
    conf: {
      aliases: ["rolkur", "rkur"],
      name: "rolkur",
      help: "rolkur",
      category: "sahip",
      owner: true,
    },
  
  run: async (client, message, args) => {
    let kanallar = ayar.ownerkomutkulanım;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
 
    if (message.guild === null) {
        return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if (!allah.owners.includes(message.author.id)) {
        return message.reply({ content: "Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {
    }

const roleData = await roleGuardSchema.findOne({ guildId: message.guild.id });

        const role = args[0];
        if(!role || isNaN(role)) return message.reply({ content: `Rol id gir.` });
        if(!roleData) return message.reply({ content: `Bot yedekleme almamış.` });
        if(roleData.id !== role) return message.reply({ content: `Rol bulunamadı.` });

        let msg = await message.reply({ content: `Rol bulundu ve rolü açıp eski üyelere geri vereceğim.` });

        const newRole = await message.guild.roles.create({
            name: roleData.name,
            hoist: roleData.hoist,
            color: roleData.color,
            position: roleData.position,
            mentionable: roleData.mentionable,
            reason: `Rol eklendi.`
        });

        setTimeout(() => {
            let permOverwrites = roleData.writes;
            if(permOverwrites) {
                permOverwrites.forEach((papazpapaz, i) => {
                    const ch = message.guild.channels.cache.get(papazpapaz.id);
                    if(!ch) return;
                    setTimeout(() => {
                        let obj = {};
                        papazpapaz.allow.forEach(allow => {
                            obj[allow] = true;
                        });
                        papazpapaz.deny.forEach(deny => {
                            obj[deny] = false;
                        });
                        ch.permissionOverwrites.create(newRole, obj).catch(err => message.channel.send({ content: `abini sikiolar kos` }))
                    }, i * 5000);
                });
            }
        }, 1000*5);

        let ert = roleData.members.length;
        if(ert <= 0) return message.channel.send({ content: `Veritanında ${newRole} rolünde bir kullanıcı bulunmadığından işlem iptal edildi.` });
        msg.edit({ content:  ``})



    }
}
