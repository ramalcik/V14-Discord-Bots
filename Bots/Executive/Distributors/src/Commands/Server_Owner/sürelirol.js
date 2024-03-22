const Discord = require('discord.js')
const ms = require("ms");
const moment = require("moment")
const conf = require("../../../../src/configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: ["srol","süreli-rol"],
    name: "sürelirol",
    help: "sürelirol @Kişi @Rol /Süre",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {

        let user = message.mentions.users.first()
        let roles = message.mentions.roles.first()
        if (!args[0]) return message.channel.send({ content: `Öncelikle bir kullanıcı belirtmelisin.` })
        if (!user) return message.channel.send({ content: `**${args[0]}**, kişisi sunucuda bulunmamakta!` })
        if (!args[1]) return message.channel.send({ content: `Öncelikle bir rol etiketlemelisin.` })
        if (!roles) return message.channel.send({ content: `**${args[1]}**, rolü sunucuda bulunmamakta.` })
        if (!args[2]) return message.channel.send({ content: `Rolün ne kadar süre içerisinde kullanıcıda kalacağını belirtmelisin.`})
        let süre = args[2];
        message.guild.members.cache.get(user.id).roles.add(roles.id)
        message.channel.send({ content:`${user} isimli kişiye ${message.author.username} tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca ${roles} rolü verildi!` }).then(mesaj => {
            setTimeout(async () => {
                message.guild.members.cache.get(user.id).roles.remove(roles.id)
                mesaj.edit({ content: `${roles}, için rol süresi doldu!` })
            }, ms(süre))
        })
    }
}