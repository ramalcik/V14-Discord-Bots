const { PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const SafeMember = require("../../../../../Protection/src/Models/Koruma");
const SafeMember2 = require("../../../../../Protection/src/Models/Safe")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("guard")
      .setDescription("Sunucu Yetkilerini açıp, kapatırsınız."),
      
    async execute(interaction, bot) {
      if(!allah.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: "Yetersiz Yetki.", ephemeral: true })
      } 

      var veri = await SafeMember2.findOne({
        guildID: interaction.guild.id
      }) || {
        "Full": [],
        "RoleAndChannel": [],
        "Role": [],
        "Channel": [],
        "Bot": [],
        "BanAndKick": [],
        "ChatG": [],
        "Permissions": [],
        "SafeRole": []
      };

      const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Guard Sayfasın da Kapat/aç Menüsü')
          .addOptions([
            {
              label: 'Guard Kapat',
              description: "Yetkilerİ Geri Kapatırsın",
              value: 'kapat',
            },
            {
              label: 'Guard Aç',
              description: "Yetkilerİ Geri Açarsın.",
              value: 'aç',
            },

          ])
      );

    const row2 = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select2')
          .setPlaceholder('Güvenli Sayfa Açmak için Menüyü Kontrol edin.')
          .addOptions([
            {
              label: 'Güvenli Menü Sekmesi',
              description: 'Güvenli Olan Rol/Kişileri Görürüsünüz.',
              value: 'help2',
            },
          ]),
      );

        const embed = new EmbedBuilder()
        .setDescription(`${interaction.user.toString()}sunucusundaki yetki verilerinin işlem tablosu aşagıda.
        
        > __Guard Aç__
        > \`Sunucu Yetkisi Açık olan rollerin yetkilerini kapatır ve açana kadar açılmaz.\`

        > __Guard Kapat__
        > \`Sunucu Yetkisi Kapalı olan rollerin yetkilerini geri açarsın.\``)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setTimestamp()

    interaction.reply({ embeds: [embed], components: [row2,row] })

      
    const filter = i => i.user.id == interaction.user.id 
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
    collector.on("collect", async (interaction) => {

         if (interaction.values[0] === "aç") {
      const perms = [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageEmojisAndStickers, PermissionsBitField.Flags.ManageWebhooks];
      let roller = interaction.guild.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))

      const ytembed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`${interaction.guild.name} sunucusundaki ${roller.map(x => x).join(", ")} rollerinin \`yetki verileri\` kaydedildi ve izinleri kapatıldı`)
      await interaction.update({ embeds: [ytembed], components: [] })
      roller.forEach(async (rol) => {
        await SafeMember.updateOne({ Role: rol.id }, {$set: {"guildID": interaction.guild.id, "Permissions": rol.permissions.bitfield }}, {upsert: true})
        await rol.setPermissions(0n)
      })
  }
        
      if (interaction.values[0] === "kapat") {
      let veri = await SafeMember.find({});
      veri.filter(x => interaction.guild.roles.cache.get(x.Role)).forEach(async (data) => {
          let rolgetir = interaction.guild.roles.cache.get(data.Role)
          if(rolgetir) rolgetir.setPermissions(data.Permissions);
      })
      await SafeMember.deleteMany({ guildID: interaction.guild.id });
      const ytembed2 = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`Başarılı bir şekilde koruma kapatıldı ve ${veri.map((x, key) => interaction.guild.roles.cache.get(x.Role)).join(", ")} rollerinin izinleri tekrar açıldı.`)
      await interaction.update({ embeds: [ytembed2], components: [] })
    }

    if (interaction.values[0] === "help2") {
      const embed2 = new EmbedBuilder()
      .setDescription(`${interaction.member.toString()}, ${interaction.guild.name} sunucusu içerisinde Aşağıdaki listeden güvenli kategorilerine ekli olan kişileri/rolleri görebilirsiniz.`)

      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Full
\`\`\`
${veri.Full.length > 0 ? veri.Full.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Role & Channel
\`\`\`
${veri.RoleAndChannel.length > 0 ? veri.RoleAndChannel.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Role
\`\`\`
${veri.Role.length > 0 ? veri.Role.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },
      )

      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Channel
\`\`\`
${veri.Channel.length > 0 ? veri.Channel.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x) ? interaction.guild.roles.cache.get(x) : interaction.guild.channels.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Bot
\`\`\`
${veri.Bot.length > 0 ? veri.Bot.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Chat
\`\`\`
${veri.ChatG.length > 0 ? veri.ChatG.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x) ? interaction.guild.roles.cache.get(x) : interaction.guild.channels.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"} 
`, inline: true
        },
      )

      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Ban & Kick
\`\`\`
${veri.BanAndKick.length > 0 ? veri.BanAndKick.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Güvenli Rol
\`\`\`
${veri.SafeRole.length > 0 ? veri.SafeRole.map(x => `${interaction.guild.roles.cache.get(x) ? interaction.guild.roles.cache.get(x) : x}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"}
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Sekme Koruma
\`\`\`
${veri.SekmeG.length > 0 ? veri.SekmeG.map(x => `${interaction.guild.members.cache.get(x) ? interaction.guild.members.cache.get(x) : interaction.guild.roles.cache.get(x) ? interaction.guild.roles.cache.get(x) : interaction.guild.channels.cache.get(x)}`).join(" \n") : "Herhangi bir üye & rol güvenliye eklenmedi!"} 
`, inline: true
        },
      )

      .setFooter(
        {
          text: interaction.user.tag,
          iconURL: interaction.member.displayAvatarURL({ dynamic: true })
        }
      )

      interaction.reply({ embeds: [embed2] })
    }


})

},
};