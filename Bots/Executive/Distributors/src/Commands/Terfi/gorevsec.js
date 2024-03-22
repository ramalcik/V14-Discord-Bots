const moment = require("moment");
require("moment-duration-format");
const client = global.bot;
const ms = require("ms")
const tasks = require("../../../../src/schemas/task");
const settings = require("../../../../../../config.json")
const coin = require("../../../../src/schemas/coin");
const Discord = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const ayars = require("../../../../src/configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["görev-al", "gorev-al"],
    name: "görevv",
    help: "görev-al",
    category: "yetkili"
  },

  run: async (client, message, args, embed) => {
 if(!conf.staffs.some(x => message.member.roles.cache.has(x))) return;  

 let buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Mesaj Görevi")
                .setCustomId("chat")
                .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
                .setLabel("Ses Görevi")
                .setCustomId("voice")
                .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
                .setLabel("Davet Görevi")
                .setCustomId("inv")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
                .setLabel("Taglı Görevi")
                .setCustomId("tags")
                .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
                .setLabel("Kayıt Görevi")
                .setCustomId("reg")
                .setStyle(Discord.ButtonStyle.Secondary),
   );
  let buttonn = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
                .setLabel("Yetkili Görevi")
                .setCustomId("yt")
                .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
                .setLabel("Yayın Görevi")
                .setCustomId("yayins")
                .setStyle(Discord.ButtonStyle.Secondary),
           new Discord.ButtonBuilder()
                .setLabel("Kamera Görevi")
                .setCustomId("cameras")
                .setStyle(Discord.ButtonStyle.Secondary)
        );
    const taskk = await tasks.find({ guildID: message.guild.id, userID: message.author.id });
    if(taskk.filter((x) => x.daily).length >= 1) { 
    message.reply({embeds:[embed.setDescription(`En Fazla Günde 1 Görevin Bulunabilir!`)]}).sil(15)
    return }
    if(taskk.filter((x) => x.active).length >= 1) return message.reply({embeds:[embed.setDescription(`En Fazla 1 Aktif Görevin Bulunabilir, Yeni Görev Almak İçin Eski Görevlerini Bitirmelisin!`)]}).sil(15);
    let member = message.member;
    let mesaj = await message.reply({ components: [buttons, buttonn], embeds: [embed.setDescription(`
    **Selamlar ${member} Aşağıda Bulunan Menüden İstediğin 1 Görevi Alabilirsin!

    Invite Görevini Alırsan 5 İla 10 Invite Arası 10 Saatli Süreli Invite Görevi Verir
    
    Ses Görevini Alırsan 60 İla 300 Dakika Arası 10 Saatli Süreli Ses Görevi Verir
    
    Mesaj Görevini Alırsan 300 İla 400 Mesaj Arası 10 Saatli Süreli Mesaj Görevi Verir
    
    Taglı Görevini Alırsan 1 İla 5 Arası 10 Saatli Süreli Taglı Görevi Verir
    
    Yetkili Görevini Alırsan 1 İla 3 Arası 10 Saatli Süreli Yetkili Görevi Verir
    
    Kayıt Görevini Alırsan 5 İla 20 Arası 10 Saatli Süreli Kayıt Görevi Verir
    
    Görev Ödüllerini 35 Coin Olarak Verir Ve Artırıla Bilir
    
    [Max 1 Adet Görev Alabilirsin,Bitirdikten Sonra Tekrardan Alabilirsin Görevlerini]**
    `).setThumbnail(message.author.displayAvatarURL({ dynamic: true }))] })

    const filter = i => i.user.id === message.member.id;
        const collector = mesaj.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: filter, time: 30000 });
        collector.on('collect', async b => {
            if (!b.isButton()) return;
            const value = b.customId;
          function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
          let mesajRandom = getRandomInt(300, 400)
              let davetRandom = getRandomInt(5, 10)
              let sesRandom = getRandomInt(60, 300)
              let yayinRandom = getRandomInt(60, 300)
              let cameraRandom = getRandomInt(60, 300)              
              let taglıRandom = getRandomInt(1, 5)
              let yetkiliRandom = getRandomInt(1, 3)
              let teyitRandom = getRandomInt(5, 20)
              let count = value == "chat" ? mesajRandom : value == "yayins" ? yayinRandom : value == "cameras" ? cameraRandom : value == "inv" ? davetRandom : value == "voice" ? sesRandom : value == "tags" ? taglıRandom : value == "yt" ? yetkiliRandom : value == "reg" ? teyitRandom : 0           
            let taskMessage;
			switch (value) {
				case "inv":
					taskMessage = `**Sunucumuza ${count} kişi davet et!**`;
					break;
				case "chat":
					taskMessage = ayars.chatChannel
						? `**${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} ${count} mesaj at!**`
						: `**Metin kanallarında ${count} mesaj at!**`;
					break;
				case "voice":
					taskMessage = ayars.publicParents
						? `**Public Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!`
						: `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!**`;
					break;
         case "yayins":
					taskMessage = ayars.publicParents
						? `**Yayın Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!`
						: `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!**`;
					break;
          case "cameras":
					taskMessage = ayars.publicParents
						? `**Kamera Kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!`
						: `**Seste ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!**`;
					break;
				case "tags":
					taskMessage = `**${count} kişiye tag aldır!**`;
					break;
        case "yt":
					taskMessage = `**${count} kişiye yetki aldır!**`;
					break;  
				case "reg":
					taskMessage = `**Sunucumuzda ${count} kişi kayıt et!**`;
					break;
			}
            if (value == "chat") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            const id = await tasks.find({ guildID: settings.GuildID });
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "mesaj", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: ayars.chatChannel, message: `${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} kanalında ${count} mesaj at!` }).save();
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün ${ayars.chatChannel ? `<#${ayars.chatChannel}>` : 'Bulunamadı.'} kanalında \`${count}\` mesaj atma görevi aldın!**`)], ephemeral: true })
            }

            if (value == "voice") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            count = 1000 * 60 * count;  
            const id = await tasks.find({ guildID: settings.GuildID, userID: b.member.id});         
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "ses", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} vakit geçir!` }).save();    
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` ses aktifliği görevi aldın!**`)], ephemeral: true })
            }

            if (value == "inv") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            const id = await tasks.find({ guildID: settings.GuildID });
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "invite", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${count} adet invite yap!` }).save();
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet davet görevi aldın!**`)], ephemeral: true })
            }

            if (value == "tags") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            const id = await tasks.find({ guildID: settings.GuildID });
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "tagli", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${count} adet taglı üye çek!` }).save();  
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet taglı üye çekme görevi aldın!**`)], ephemeral: true })
            }

            if (value == "reg") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            const id = await tasks.find({ guildID: settings.GuildID });
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "kayıt", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${count} adet kayıt yap!` }).save();
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet kayıt yapma görevi aldın!**`)], ephemeral: true })
            }
          
            if (value == "yt") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            const id = await tasks.find({ guildID: settings.GuildID });
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "yetkili", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `${count} adet yetkili üye çek!` }).save();  
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün \`${count}\` adet yetkili üye çekme görevi aldın!**`)], ephemeral: true })
            }
            if (value == "yayins") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            count = 1000 * 60 * count;  
            const id = await tasks.find({ guildID: settings.GuildID, userID: b.member.id});         
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "yayin", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} yayın aç!` }).save();    
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` yayın açma görevi aldın!**`)], ephemeral: true })
            }
            if (value == "cameras") {
            await b.deferUpdate();
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ components: [buttons, buttonn] })   
            count = 1000 * 60 * count;  
            const id = await tasks.find({ guildID: settings.GuildID, userID: b.member.id});         
            await new tasks({ guildID: settings.GuildID, userID: b.member.id, id: id ? id.length + 1 : 1, type: "camera", count: count, prizeCount: 35, active: true, finishDate: moment().endOf('day'), channels: null, message: `Ses kanallarında ${moment.duration(count).format("H [saat], m [dk], s [sn]")} kamera aç!` }).save();    
            b.followUp({ components: [], embeds: [embed.setDescription(`**${b.member} bugün ses kanallarında \`${moment.duration(count).format("H [saat], m [dk], s [sn]")}\` kamera açma görevi aldın!**`)], ephemeral: true })        
          }
        })
        collector.on('end', async b => {
            buttons.components[0].setDisabled(true);
            buttons.components[1].setDisabled(true);
            buttons.components[2].setDisabled(true);
            buttons.components[3].setDisabled(true);
            buttons.components[4].setDisabled(true);
            buttonn.components[0].setDisabled(true);
            buttonn.components[1].setDisabled(true);
            buttonn.components[2].setDisabled(true);   
            mesaj.edit({ embeds: [embed.setDescription(`**Menü Kullanım Süresi Doldu.**`)], components: [buttons, buttonn] })           
        })
    }
  }