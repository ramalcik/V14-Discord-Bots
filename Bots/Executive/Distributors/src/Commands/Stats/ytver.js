const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, green, info, Tac } = require("../../../../src/configs/emojis.json");
let ayar = require("../../../../src/configs/sunucuayar.json");
let conf = require("../../../../src/configs/yetkili.json");
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["ytver"],
    name: "yetki",
    help: "yetki",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.react(red)
      message.reply({
        embeds: [new EmbedBuilder()
          .setThumbnail()
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
          .setDescription(`${red} Yeterli yetkin yok!`)
        ]
      }).then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }
    if (!member) return message.reply({
      embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Gerçek Kullanım \`.ytver @Kişi/ID\` İşlemleri menü üzerinde seçim yapın`)
      ]
    }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if (message.author.id === member.id) return message.reply({ content: `Kendine Rol Veremezsin dostum!`, ephemeral: true });

    // Ramal tarafindan yapilmistir adina cikani sikerim
    let selectMenu = new StringSelectMenuBuilder()
    .setCustomId('ytver')
    .setPlaceholder('Yetki Vermek İstediniz Kişiye Etiket atdın');
  
  // Ramal tarafindan yapilmistir adina cikani sikerim
  for (const [key, value] of Object.entries(conf)) {
    selectMenu.addOptions({
      label: key,
      value: key,
      description: `Yetki rolü: ${value}`,
    });
  }

    const row = new ActionRowBuilder()
      .addComponents(
        selectMenu
      );

    const ancient = new EmbedBuilder()
      .setDescription(`>  ${Tac} ${message.author} Merhaba ${member.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde Vermek İstediginz Yetkili Türünü Aşagıdan Seçiniz`)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

    let msg = await message.reply({ embeds: [ancient], components: [row], });


    if (msg) {
      var filter = (xd) => xd.user.id === message.author.id;
      let collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })

      collector.on("collect", async (interaction) => {
        
        const selectedRole = interaction.values[0];
        
        const selectedRoleId = conf[selectedRole];

        client.channels.cache.find(x => x.name == "yetkili_log").send({
          embeds: [embed.setDescription(`${member} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından \`${selectedRole}\` adlı rol verildi.`)]
        });

        if (msg) msg.delete();
        const embeds = new EmbedBuilder()
          .setDescription(`${green} ${message.author} Merhaba ${member.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişiye \`${selectedRole}\` rolü verildi.`)
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        interaction.reply({ embeds: [embeds], ephemeral: false });
        await member.roles.add(selectedRoleId);
      });
    }
  }
}
