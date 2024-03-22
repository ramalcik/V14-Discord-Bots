const { PermissionsBitField, EmbedBuilder, Client, Message, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { nokta } = require("../../../../src/configs/emojis.json")
const Discord = require('discord.js');
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["rolmenü","menuselect"],
    name: "menü",
    help: "rolmenü",
    category: "sahip",
    owner: true,
  },
 
  run: async (client, message, args, durum, kanal) => {

    let embed = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addFields(
        { name: "ROL MENÜ KURULUM",  value: `\` ❯ \` Kurmak istediğiniz rol menü kategorisini aşağıdaki butonlardan seçebilirsiniz.`, inline: false },
    )
        
    
    let papaz = await message.channel.send({
        "embeds": [embed],
          "components":[{
            "type":1,
            "components":[
                    {"type":2,"style":2,"custom_id":"hepsi","label":"Hepsi (Rol Seçimler)", "emoji": { "id": "901357196124774471" } },
                    {"type":2,"style":2,"custom_id":"etkinlikmenü","label":"Etkinlik/Çekiliş", "emoji": { "id": "941993742934614047" } },
                    {"type":2,"style":2,"custom_id":"ilişkimenü","label":"İlişki Durumu Seçim", "emoji": { "id": "956149326877438002" } },
                ]}, {  "type":1,"components":[
                    {"type":2,"style":2,"custom_id":"burçmenü","label":"Burç Seçim", "emoji": { "id": "931658529314603008" } },
                    {"type":2,"style":2,"custom_id":"oyunmenü","label":"Oyun Seçim", "emoji": { "id": "956149332313243668" } },
                    {"type":2,"style":2,"custom_id":"renkmenü","label":"Renk Seçim", "emoji": { "id": "746992558927904891" } },
                    {"type":2,"style":4,"custom_id":"iptal","label":"İşlem İptal", "emoji": { "id": "921703086823714858" } },
                   ]}
            ]})
    
    
        var filter = (xd) => xd.user.id === message.author.id;
        let collector = await papaz.createMessageComponentCollector({ filter,  time: 30000 })
        
        collector.on("collect", async (button) => {
        
            if (button.customId === "hepsi") {
            await papaz.delete({ timeout: 1500 });
    
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Etkinlik** rollerinden dilediğinizi alabilirsiniz`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "etkinliks", "options": [
                                { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                                { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "burc", "options": [
                                { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                                { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                                { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                                { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                                { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                                { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                                { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                                { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                                { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                                { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                                { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                                { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `${nokta} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "games", "options": [
                                { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                                { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                                { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                                { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                                { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                                { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "880606175488540693" }, },
                            ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "renk", "options": [
                                { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                                { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                                { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                                { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                                { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "iliski", "options": [
                                { "label": "Couple", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                                { "label": "Alone", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
    
            if (button.customId === "etkinlikmenü") {
            await papaz.delete({ timeout: 1500 });
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Etkinlik** rollerinden dilediğinizi alabilirsiniz`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "etkinliks", "options": [
                                { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                                { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "ilişkimenü") {
            await papaz.delete({ timeout: 1500 });
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "iliski", "options": [
                                { "label": "Couple", "value": "couple", "emoji": { "id": "855054137296814101" }, },
                                { "label": "Alone", "value": "alone", "emoji": { "id": "835704673204830238" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "burçmenü") {
            await papaz.delete({ timeout: 1500 });
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "burc", "options": [
                                { "label": "Koç", "value": "koç", "emoji": { "id": "931658251181887508" }, },
                                { "label": "Boğa", "value": "boğa", "emoji": { "id": "931659095629529168" }, },
                                { "label": "İkizler", "value": "ikizler", "emoji": { "id": "931658687028789289" }, },
                                { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "931658642955075604" }, },
                                { "label": "Aslan", "value": "aslan", "emoji": { "id": "931657544756248606" }, },
                                { "label": "Başak", "value": "başak", "emoji": { "id": "931658178482012201" }, },
                                { "label": "Terazi", "value": "terazi", "emoji": { "id": "931658529314603008" }, },
                                { "label": "Akrep", "value": "akrep", "emoji": { "id": "931658863923593297" }, },
                                { "label": "Yay", "value": "yay", "emoji": { "id": "931658575951048714" }, },
                                { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "931658464512598056" }, },
                                { "label": "Kova", "value": "kova", "emoji": { "id": "931658397860892672" }, },
                                { "label": "Balık", "value": "balık", "emoji": { "id": "931657587886264340" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "oyunmenü") {
            await papaz.delete({ timeout: 1500 });
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "games", "options": [
                                { "label": "CS:GO", "value": "csgo", "emoji": { "id": "880606175274598461" }, },
                                { "label": "League of Legends", "value": "lol", "emoji": { "id": "880606175761145906" }, },
                                { "label": "Valorant", "value": "valorant", "emoji": { "id": "880606175387873281" }, },
                                { "label": "Gta V", "value": "gta5", "emoji": { "id": "880606175408824321" }, },
                                { "label": "PUBG", "value": "pubg", "emoji": { "id": "880606175178153994" }, },
                                { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "880606175488540693" }, },
                            ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId === "renkmenü") {
            await papaz.delete({ timeout: 1500 });
            message.channel.send({ content: `> ${nokta} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                    "components": [{
                        "type": 1, "components": [{
                            "type": 3, "custom_id": "renk", "options": [
                                { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "🍓" }, },
                                { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🍊" }, },
                                { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "🍇" }, },
                                { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "🍑" }, },
                                { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "🥑" }, },
                                { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                            ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                        }],
                    }
                    ]
            })
            }
        
            if (button.customId == "iptal") {
            await papaz.delete({ timeout: 1500 });
            }
        
        }
        )}
        
    }
    
    
    
    client.on('interactionCreate', async interaction => {
    const member = await client.guilds.cache.get(allah.GuildID).members.fetch(interaction.member.user.id)
    if (!member) return;
    
    const etkinlik = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.etkinlik))
    const cekilis = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.cekilis))
     
     if (interaction.customId === "etkinliks") {
            let eventsMap = new Map([
              ["etkinlik", etkinlik],
              ["cekilis", cekilis],
            ])
            let roles = [etkinlik, cekilis]
            var role = []
            for (let index = 0; index < interaction.values.length; index++) {
              let ids = interaction.values[index]
              let den = eventsMap.get(ids)
              var role = []
              role.push(den);
            }
            if (interaction.values[0] === "rolsil") {
                await member.roles.remove(roles)
              } else {
                if (!interaction.values.length) {
                    await member.roles.remove(roles).catch(err => {})
                  } else if (interaction.values.length > 1) {
                    await member.roles.add(roles).catch(err => {})
                  } else {
                    await member.roles.remove(roles).catch(err => {})
                    await member.roles.add(role).catch(err => {})
                  }
              }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
          } 
    
    const koç = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.koç))
    const boğa = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.boğa))
    const ikizler = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.ikizler))
    const yengeç = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.yengeç))
    const aslan = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.aslan))
    const başak = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.başak))
    const terazi = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.terazi))
    const akrep = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.akrep))
    const yay = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.yay))
    const oğlak = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.oğlak))
    const kova = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.kova))
    const balık = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Burçlar.balık))
    
          if (interaction.customId === "burc") {
            let burçMap = new Map([
                ["koç", koç],
                ["boğa", boğa],
                ["ikizler", ikizler],
                ["yengeç", yengeç],
                ["aslan", aslan],
                ["başak", başak],
                ["terazi", terazi],
                ["akrep", akrep],
                ["yay", yay],
                ["oğlak", oğlak],
                ["kova", kova],
                ["balık", balık],
              ])
              let roles = [koç, boğa, ikizler, yengeç, aslan, başak, terazi, akrep, yay, oğlak, kova, balık]
              let role = burçMap.get(interaction.values[0])
              if (interaction.values[0] === "rolsil") {
                await member.roles.remove(roles)
              } else if (role) {
                if (roles.some(m => member.roles.cache.has(m))) {
                  await member.roles.remove(roles)
                }
                await member.roles.add(role)
              }
              interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })    
          }
    
    const csgo = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.csgo))
    const lol = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.lol))
    const valorant = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.valorant))
    const gta5 = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.gta5))
    const pubg = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.pubg))
    const fortnite = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Oyunlar.fortnite))
    
        if (interaction.customId === "games") {
            let GameMap = new Map([
              ["csgo", csgo],
              ["lol", lol],
              ["valorant", valorant],
              ["gta5", gta5],
              ["pubg", pubg],
              ["fortnite", fortnite],
            ])
            let roles = [csgo, lol, valorant, gta5, pubg, fortnite]
            var role = []
            for (let index = 0; index < interaction.values.length; index++) {
              let ids = interaction.values[index]
              let den = GameMap.get(ids)
              role.push(den)
            }
            if (!interaction.values.length) {
              await member.roles.remove(roles)
            } else {
              await member.roles.remove(roles)
              await member.roles.add(role)
            } 
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
          }
    
    const kirmizi = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.kirmizi))
    const turuncu = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.turuncu))
    const mor = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.mor))
    const pembe = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.pembe))
    const yesil = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.yesil))
    
    if (interaction.customId === "renk") {
            let color = new Map([
              ["kirmizi", kirmizi],
              ["turuncu", turuncu],
              ["mor", mor],
              ["pembe", pembe],
              ["yesil", yesil],
      
            ])
            let role = color.get(interaction.values[0])
            let renkroller = [kirmizi, turuncu, mor, pembe, yesil]
            if (!member.roles.cache.has(conf.ekipRolu) && !member.roles.cache.has(conf.boosterRolu) && !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
            } else {
              if (interaction.values[0] === "rolsil") {
                await member.roles.remove(renkroller)
              } else if (role) {
                if (renkroller.some(m => member.roles.cache.has(m))) {
                  await member.roles.remove(renkroller)
                }
                await member.roles.add(role)
              }
              interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
            }
          }
    
    const sevgili = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.İlişkiler.couple))
    const yalnız = await client.guilds.cache.get(allah.GuildID).roles.cache.find(x => x.name.includes(ayar.İlişkiler.alone))
    
          if (interaction.customId === "iliski") {
            let ilişki = new Map([
                ["couple", sevgili],
                ["alone", yalnız],
              ])
              let role = ilişki.get(interaction.values[0])
              let iliskiroller = [sevgili, yalnız]
    
                if (interaction.values[0] === "rolsil") {
                  await member.roles.remove(iliskiroller)
                } else if (role) {
                  if (iliskiroller.some(m => member.roles.cache.has(m))) {
                    await member.roles.remove(iliskiroller)
                  }
                  await member.roles.add(role)
                }
                interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
        }
    })