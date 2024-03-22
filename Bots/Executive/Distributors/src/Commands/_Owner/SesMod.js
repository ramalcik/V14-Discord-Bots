const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const Database  = require("../../../../src/schemas/WelcomeMode");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const children = require("child_process");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ['sesmod','sesmode','ses-mode'],
    name: "ses-mod",
    help: "ses-mod [mod]",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    const data = await Database.findOne({ guildID: allah.GuildID });
    let hosgeldin = "./src/sesler/hosgeldin.mp3"
    let taglialim = "./src/sesler/taglialim.mp3"
    let konser = "./src/sesler/konser.mp3"
    let turnuva = "./src/sesler/turnuva.mp3"
    let toplantı = "./src/sesler/toplanti.mp3"
    let cekilis = "./src/sesler/cekilis.mp3"

    const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('yardım')
        .setPlaceholder('Aktif etmek istediğiniz sesli karşılama modunu listeden seçin!')
        .addOptions([
          {
            label: 'Hoşgeldin Mod',
            description: 'Hoşgeldin sesli modu aktif et!',
            value: 'mod',
          },
          {
            label: 'Taglı Alım Mod',
            description: 'Taglı Alım sesli modu aktif et!',
            value: 'mod3',
          },						
          {
            label: 'Konser Mod',
            description: 'Konser sesli modu aktif et!',
            value: 'mod4',
          },
          {
            label: 'Turnuva Mod',
            description: 'Turnuva sesli modu aktif et!',
            value: 'mod5',
          },
          {
            label: 'Toplantı Mod',
            description: 'Toplantı sesli modu aktif et!',
            value: 'mod6',
          },
          {
            label: 'Çekiliş Mod',
            description: 'Çekiliş sesli modu aktif et!',
            value: 'mod7',
          }
        ]),
    );

let msg = await message.reply({ components: [row] });

var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
  await menu.deferUpdate();
    if(menu.values[0] === "mod") {
      if(data && data.SesMod === hosgeldin) return msg.edit({ content: `Zaten ses modu \` Hoş geldin \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: hosgeldin}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Hoş geldin \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
    if(menu.values[0] === "mod3") {
      if(data && data.SesMod === taglialim) return msg.edit({ content: `Zaten ses modu \` Taglı Alım \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: taglialim}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Taglı Alım \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
    if(menu.values[0] === "mod4") {
      if(data && data.SesMod === konser) return msg.edit({ content: `Zaten ses modu \` Konser \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: konser}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Konser \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
    if(menu.values[0] === "mod5") {
      if(data && data.SesMod === turnuva) return msg.edit({ content: `Zaten ses modu \` Turnuva \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: turnuva}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Turnuva \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
    if(menu.values[0] === "mod6") {
      if(data && data.SesMod === toplantı) return msg.edit({ content: `Zaten ses modu \` Toplantı \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: toplantı}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Toplantı \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
    if(menu.values[0] === "mod7") {
      if(data && data.SesMod === cekilis) return msg.edit({ content: `Zaten ses modu \` Çekiliş \` olarak ayarlı`, components: [] });
      await Database.findOneAndUpdate({ guildID: allah.GuildID }, {SesMod: cekilis}, { upsert: true })
      msg.edit({ content: `**Ses modu** başarıyla \` Çekiliş \` olarak ayarlandı.`, components: [] });
      children.exec(`pm2 restart ${allah.GuildName}_Welcomes`);
    }
})
 },
 };