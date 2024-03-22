const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, green,Tac } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
let conf = require("../../../../src/configs/yetkili.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;


module.exports = {
  conf: {
    aliases: ["yetkili-çek","ytçek"],
    name: "yetkili-çek",
    help: "yetkili-çek",
    category: "Stats",
  },

  run: async (client, message, args, embed) => {

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   
    if(!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
        message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Yeterli yetkin yok!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if (!uye) return message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Gerçek Kullanım \`.ytçek @Kişi/ID\` İşlemleri menü üzerinde seçim yapın`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    if(message.author.id === uye.id) return message.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })


    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('ytçek')
            .setPlaceholder('Yetki çekmek istiyorsanız menü den onay yapın.')
            .addOptions([
                {
                    label: 'Yetki Çek',
                    value: 'ytçek',
                },
            ]),
    );
    
    const ancient = new EmbedBuilder()
.setDescription(`> ${Tac} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde Vermek İstediginz Yetkili Türünü Aşagıdan Seçiniz`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setColor("Random")

let msg = await message.reply({ embeds: [ancient], components : [row],});
    

if (msg) {
  var filter = (xd) => xd.user.id === message.author.id;
  let collector =  msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })
      
    collector.on("collect", async (interaction) => {
    
         if (interaction.values[0] === "ytçek") {
     
{
              client.channels.cache.find(x => x.name == "yetkili-çek_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından roller çekildi.`)]})
              if(msg) msg.delete();
              const embeds = new EmbedBuilder()
              .setDescription(`${green} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişinin üstünden bütün roller çekildi.`)
              .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
              .setColor("Random")
              interaction.reply({ embeds: [embeds], ephemeral: false });
              await uye.roles.remove(conf.altyönetim)
              await uye.roles.remove(conf.ortayönetim)
              await uye.roles.remove(conf.üstyönetim)
              await uye.roles.remove(conf.owneryönetim)
              
            };
         }
          
          
        })
    
    }
    }    }        