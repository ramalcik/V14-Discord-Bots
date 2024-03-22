const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, green } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
let conf = require("../../../../src/configs/yetkili.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;


module.exports = {
  conf: {
    aliases: ["yetki-aldır", "yetkili", "yetkili","ytver"],
    name: "yetki-aldır",
    help: "yetki-aldır",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   

    if (!uye) return message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Gerçek Kullanım \`.ytver @Kişi/ID\` İşlemleri menü üzerinde seçim yapın`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    if(message.author.id === uye.id) return message.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })


    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('ytver')
            .setPlaceholder('Yetki Vermek İstediniz Kişiye Etiket atdın')
            .addOptions([
                {
                    label: 'Alt Yönetim',
                    value: 'altyönetim',
                    emoji: '1199353951825436703'
                },
                {
                  label: 'Orta Yönetim',
                  value: 'ortakyönetim',
                  emoji: '1199353951825436703'
              },
              {
                label: 'Üst Yönetim',
                value: 'üstyönetim',
                emoji: '1199353951825436703'
            },
            {
              label: 'Owner Yönetim',
              value: 'owneryönetim',
              emoji: '1199353951825436703'
          },
            ]),
    );
    
    const ancient = new EmbedBuilder()
.setDescription(`${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde Vermek İstediginz Yetkili Türünü Aşagıdan Seçiniz`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setColor("Random")

let msg = await message.reply({ embeds: [ancient], components : [row],});
    

if (msg) {
  var filter = (xd) => xd.user.id === message.author.id;
  let collector =  msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 30000 })
      
    collector.on("collect", async (interaction) => {
    
         if (interaction.values[0] === "altyönetim") {
          await uye.roles.add(conf.altyönetim) 
{
              client.channels.cache.find(x => x.name == "yetkili_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından \`İlk Yönetim\` adlı rol verildi.`)]})
              if(msg) msg.delete();
              const embeds = new EmbedBuilder()
              .setDescription(`${green} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişiye \`İlk Yönetim\` rolü verildi.`)
              .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
              .setColor("Random")
              interaction.reply({ embeds: [embeds], ephemeral: false });
            };
         }
         if (interaction.values[0] === "ortakyönetim") {
        
         {
              client.channels.cache.find(x => x.name == "yetkili_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından \`Orta Yönetim\` adlı rol verildi.`)]})
              if(msg) msg.delete();
              const embeds = new EmbedBuilder()
              .setDescription(`${green} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişiye \`Orta Yönetim\` rolü verildi.`)
              .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
              .setColor("Random")
              interaction.reply({ embeds: [embeds], ephemeral: false });
              await uye.roles.remove(conf.altyönetim)
             await uye.roles.add(conf.ortayönetim)
            };
          }
          if (interaction.values[0] === "üstyönetim") {
            
           {
                client.channels.cache.find(x => x.name == "yetkili_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından \`Üst Yönetim\` adlı rol verildi.`)]})
                if(msg) msg.delete();
                const embeds = new EmbedBuilder()
                .setDescription(`${green} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişiye \`Üst Yönetim\` rolü verildi.`)
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setColor("Random")
                interaction.reply({ embeds: [embeds], ephemeral: false });
                await uye.roles.add(conf.üstyönetim)
                await uye.roles.remove(conf.ortayönetim)
              };
            }
            
            if (interaction.values[0] === "owneryönetim") {
              
             {
                  client.channels.cache.find(x => x.name == "yetkili_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından \`Owner Yönetim\` adlı rol verildi.`)]})
                  if(msg) msg.delete();
                  const embeds = new EmbedBuilder()
                  .setDescription(`${green} ${message.author} Merhaba ${uye.toString()}  Kullanıcısına kullanıcıyı \`${moment(Date.now()).format("LLL")}\` Tarihinde isimli kişiye \`Owner Yönetim\` rolü verildi.`)
                  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                  .setColor("Random")
                  interaction.reply({ embeds: [embeds], ephemeral: false });
                  await uye.roles.add(conf.owneryönetim)
                await uye.roles.remove(conf.üstyönetim)
                };
              }

          
        })
    
    }
    }    }        
