const { Database } = require("ark.db");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, ButtonBuilder,StringSelectMenuBuilder,EmbedBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const {istatistik} = require("../../../../src/configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

      const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('rolmenü')
          .setPlaceholder('Kurulum Menüsü Açar')
          .addOptions([
            {
              label: `Rol Kurulum`,
              description: `Menü Rol Kurulum`,
              value: "rol",
            },
            {
              label: `Kanal Kurulum`,
              description: `Log Kanalarını Kurulum Saglarsın`,
              value: "kanal",
            },
            {
              label: `Emoji Kurulum`,
              description: `Emoji Kurulum`,
              value: "emoji",
            },
          ]),
      );


      let papaz = new EmbedBuilder()
      .setDescription(`**Kurulum Menüsü Aşagıdaki Menülerden Seçim Yapa bilirsiniz lütfen** \`60 sn\` **seçim yapın yoksa iptal eder**`)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      
      let msg = await message.channel.send({ embeds: [papaz], components : [row],})
       
       var filter = (button) => button.user.id === message.author.id;
       let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })


      collector.on("collect", async (interaction) => {

          if (interaction.values[0] === "rol") {
          await interaction.deferUpdate();

         await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });
  
          await interaction.guild.roles.create({
            name: "🍓",
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍊",
            color: "#ff8b00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍇",
            color: "#4f00ff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍑",
            color: "#ff00d1",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🥑",
            color: "#56ff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Sevgilim Yok 💔",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Sevgilim Var 💍",
            color: "#e73084",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Çekiliş Katılımcısı 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Etkinlik Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♏ Akrep",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♉ Boğa",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♍ Başak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♊ İkizler",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♒ Kova",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♈ Koç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♋ Yengeç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♑ Oğlak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♎ Terazi",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♌ Aslan",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♓ Balık",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♐ Yay",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 CS:GO",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 League of Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Valorant",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Gta V",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 PUBG",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Fortnite",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

          if (interaction.values[0] === "kanal") {
          await interaction.deferUpdate();
 
          const parent = await interaction.guild.channels.create({ name: 'Log',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            }]
          });
          await interaction.guild.channels.create({ name: 'başvuru_log', 
          type: ChannelType.GuildText,
          parent: parent.id,
          permissionOverwrites: [{
          id: interaction.guild.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
          deny: [PermissionsBitField.Flags.SendMessages],
        }]
        });
        await interaction.guild.channels.create({ name: 'sorun-ilet_log', 
        type: ChannelType.GuildText,
        parent: parent.id,
        permissionOverwrites: [{
        id: interaction.guild.id,
        allow: [PermissionsBitField.Flags.ViewChannel],
        deny: [PermissionsBitField.Flags.SendMessages],
      }]
      });
      await interaction.guild.channels.create({ name: 'oneri_ilet_log', 
      type: ChannelType.GuildText,
      parent: parent.id,
      permissionOverwrites: [{
      id: interaction.guild.id,
      allow: [PermissionsBitField.Flags.ViewChannel],
      deny: [PermissionsBitField.Flags.SendMessages],
    }]
    });
          await interaction.guild.channels.create({ name: 'protection_log', 
          type: ChannelType.GuildText,
          parent: parent.id
        });
          await interaction.guild.channels.create({ name: 'family_log', 
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'role_log', 
        type: ChannelType.GuildText,
        parent: parent.id
      });
      await interaction.guild.channels.create({ name: 'command_log',
      type: ChannelType.GuildText,
      parent: parent.id
      });
          await interaction.guild.channels.create({ name: 'message_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'voice_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'stream_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'camera_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'mute_deaf_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'register_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'name_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
        await interaction.guild.channels.create({ name: 'go_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'Check_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'indifferent_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'ban_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'jail_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'mute_log',
        type: ChannelType.GuildText,
        parent: parent.id
      });
      await interaction.guild.channels.create({ name: 'uyarı_log',
      type: ChannelType.GuildText,
      parent: parent.id
    });
    await interaction.guild.channels.create({ name: 'görev_log',
    type: ChannelType.GuildText,
    parent: parent.id
  });
  await interaction.guild.channels.create({ name: 'mazeret_log',
  type: ChannelType.GuildText,
  parent: parent.id
});
    await interaction.guild.channels.create({ name: 'fake_Hesap_log',
    type: ChannelType.GuildText,
    parent: parent.id
  });
        await interaction.guild.channels.create({ name: 'cezapuan_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'priv_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

          if (interaction.values[0] === "emoji") {
          await interaction.deferUpdate();
          const emojis = [
            { name: "green", url: "https://cdn.discordapp.com/emojis/835323093265678338.gif?size=80&quality=lossless"},
            { name: "red", url: "https://cdn.discordapp.com/emojis/1104713848780492902.png?size=80&quality=lossless  "},
            { name: "Erkek", url: "https://cdn.discordapp.com/attachments/1092182745033224334/1189547068428132392/859325922289516555.gif?ex=659e8f09&is=658c1a09&hm=31700544893370f74362795c83f7b99c9672586cf1bde060db5f93bb0aa047ae&"},
            { name: "ramal_nokta", url: "https://cdn.discordapp.com/emojis/1214500179000950834.webp?size=96&quality=lossless"},
            { name: "ramal_yildizsarii", url: "https://cdn.discordapp.com/emojis/1214493185057890355.gif?size=96&quality=lossless"},
            { name: "Kadin", url: "https://cdn.discordapp.com/attachments/1092182745033224334/1189547068059025469/849254817889386527.gif?ex=659e8f09&is=658c1a09&hm=6c4c3d6ad84b6f4ae04f28e37a86410a3a5218a01e672e6f6c6a3dad0258323b&"},  
            { name: "nokta", url: "https://cdn.discordapp.com/emojis/1127250503340924968.png?size=80&quality=lossless"},  
            { name: "ses", url: "https://cdn.discordapp.com/emojis/1166864225038258186.png?size=80&quality=lossless"},  
            { name: "sesmute", url: "https://cdn.discordapp.com/emojis/1155169597075501076.png?size=80&quality=lossless"},       
            { name: "mute", url: "https://cdn.discordapp.com/emojis/1152372931993813022.png?size=80&quality=lossless"}, 
            { name: "pc", url: "https://cdn.discordapp.com/emojis/1168300434440589342.png?size=80&quality=lossless"}, 
            { name: "mesaj", url: "https://cdn.discordapp.com/emojis/1155169606571409458.png?size=80&quality=lossless"}, 
            { name: "info", url: "https://cdn.discordapp.com/emojis/1107224435817185340.png?size=80&quality=lossless"}, 
            { name: "cikis", url: "https://cdn.discordapp.com/emojis/1116520122937528420.png?size=80&quality=lossless"},   
            { name: "giris", url: "https://cdn.discordapp.com/emojis/1116520139072999474.png?size=80&quality=lossless"},    
            { name: "istatistik", url: "https://cdn.discordapp.com/emojis/852453245468803132.png?size=80&quality=lossless"},    
            { name: "bann", url: "https://cdn.discordapp.com/emojis/1067098726381920256.gif?size=80&quality=lossless"},    
            { name: "cekilis", url: "https://cdn.discordapp.com/attachments/1133074433393836164/1139272503454347274/cekilis.gif"},
            { name: "canlidestek", url: "https://cdn.discordapp.com/emojis/1150167067358679141.png?size=80&quality=lossless"},
            { name: "yetkili", url: "https://cdn.discordapp.com/emojis/1112261914005872670.png?size=80&quality=lossless"},
            { name: "gorevli", url: "https://cdn.discordapp.com/emojis/1150167069447434291.png?size=80&quality=lossless"},
            { name: "basvuru", url: "https://cdn.discordapp.com/emojis/1089605326631862302.png?size=80&quality=lossless"},
            { name: "ok", url: "https://cdn.discordapp.com/emojis/1128068155223310518.gif?size=80&quality=lossless"},
            { name: "welcome1", url: "https://cdn.discordapp.com/emojis/1084535921963180155.png?size=80&quality=lossless"},
            { name: "welcome2", url: "https://cdn.discordapp.com/emojis/1104887980696543294.gif?size=80&quality=lossless"}, 
            { name: "welcome3", url: "https://cdn.discordapp.com/emojis/1150128023690018897.gif?size=80&quality=lossless"},
            { name: "welcome4", url: "https://cdn.discordapp.com/emojis/1138508296471466106.png?size=80&quality=lossless"},
            { name: "empty", url: "https://cdn.discordapp.com/emojis/931967080624971816.webp?size=96&quality=lossless"},
            { name: "emptyend", url: "https://cdn.discordapp.com/emojis/931967080675287091.webp?size=96&quality=lossless"},
            { name: "fill", url: "https://cdn.discordapp.com/emojis/931967080595587102.gif?size=96&quality=lossless"},
            { name: "fillend", url: "https://cdn.discordapp.com/emojis/931967080486559776.gif?size=96&quality=lossless"},
            { name: "fillstart", url: "https://cdn.discordapp.com/emojis/931967080654307358.gif?size=96&quality=lossless"},
            { name: "Hello", url: "https://cdn.discordapp.com/emojis/928882564385615873.gif?size=44&quality=lossless"},
            { name: "Loading", url: "https://cdn.discordapp.com/emojis/928317729759440957.gif?size=44&quality=lossless"},
            { name: "Tac", url: "https://cdn.discordapp.com/emojis/928317108461396038.gif?size=44&quality=lossless"},
            { name: "Brh", url: "https://cdn.discordapp.com/emojis/928317439803019274.gif?size=44&quality=lossless"},
            { name: "jail", url: "https://cdn.discordapp.com/emojis/1123085953351823410.png?size=80&quality=lossless"},
          


 

            
            
            ]
          const SayıEmojis = [  
            { name: "sifir", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987783613399101/metoa0.gif" },
            { name: "bir", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987148390248519/metoa1.gif" },
            { name: "iki", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987467715203152/metoa2.gif" },
            { name: "uc", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987499130540133/metoa3.gif" },
            { name: "dort", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987551219593256/metoa4.gif" },
            { name: "bes", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987634069688451/metoa5.gif" },
            { name: "alti", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987657343869049/metoa6.gif" },
            { name: "yedi", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987675110953030/metoa7.gif" },
            { name: "sekiz", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987723160887518/metoa8.gif" },
            { name: "dokuz", url: "https://cdn.discordapp.com/attachments/825988797102686210/1088987723597086810/metoa9.gif" }
            ]
          emojis.forEach(async (x) => {
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

            SayıEmojis.forEach(async (x) => {
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
              if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

        }
  
      })

    }
  },
};