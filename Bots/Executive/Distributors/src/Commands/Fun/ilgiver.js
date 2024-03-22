const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { green } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, Client, Message, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["ilgiver","ilgi"],
    name: "ilgiver",
    help: "ilgiver",
    category: "User" 
  },

  run: async (client, message, args, embed) => {
    
    let kanallar = ["bot-commands","bot-command"];
    if (!kanallar.includes(message.channel.name)) return message.reply({ content: `Bot Komut kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (!member) {
        return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
    }


    let iltifatlar = [
        "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
        "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
        "Mavi gözlerin, gökyüzü oldu dünyamın.",
        "Seni gören kelebekler, narinliğin karşısında mest olur.",
        "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
        "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
        "Huzur kokuyor geçtiğin her yer.",
        "En güzel manzaramsın benim, seyretmeye doyamadığım.",
        "Sen benim düşlerimin surete bürünmüş halisin.",
        "Bir sahil kasabasının huzuru birikmiş yüzüne.",
        "Gülüşünde nice ilaçlar var yarama merhem olan.",
        "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
        "Işığınla gecemi aydınlatıyorsun.",
        "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
        "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
        "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
        "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
        "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
        "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
        "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
        "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
        "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
        "Etkili gülüş kavramını ben senden öğrendim.",
        "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
        "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
        "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
        "Gözlerinle baharı getirdin garip gönlüme.",
        "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
        "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
        "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
        "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
        "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
        "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
        "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
        "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
        "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
        "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
        "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
        "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
        "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
        "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
        "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
        "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
        "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
      ];
    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('İlgi/Süründür/Öp/Tokat')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
                label: "İlgi Ver!",
                value: "ilgi",
                description: "İlgi sevgi verir azıcıkdaa götünü kaldırır",  
          },
          { 
            label: "Süründür!",
            value: "süründür",
            description: "İlgi vermez trip atarak süründürür",
          },
          { 
            label: "Öp!",
            value: "öp",
            description: "Tatlışş bi öpücükk verir",
          },
          { 
            label: "Tokat!",
            value: "tokat",
            description: "Koydun mu oturtur yerden yere vurursun.",
          },
          { 
            label: "Kucağına Al",
            value: "kucak",
            description: "Kucağına alır sevişmeye başlar.",
          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",          }
        ])
        );


      
       

const ramal = new EmbedBuilder()
.setDescription(`Birileri bişeyler mi yapmak istiyormuşş nE
Heyy ${member} ${message.author} senden hoşlaşıyormuşşş gibi hissediyorum ben.

Ayrıca aşağıdaki menüden istediğiniz diğer istekleri de uygulayabilirsiniz.`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [ramal], components : [row],})
            message.react(`${client.emojis.cache.find(x => x.name === "green")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

             if(interaction.values[0] == "ilgi") {
            
    
    const ilgi = new EmbedBuilder()
    .setDescription(`${member} **${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}**`) 

            interaction.update({ embeds: [ilgi], ephemaral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		
                if(interaction.values[0] == "süründür") {
                
    const süründür = new EmbedBuilder()
    .setDescription(`${member} git konuşmuyom senlee, tripliyim sanaa burnun sürünsün biraz.`) 
    .setImage("https://i0.wp.com/img-11.onedio.com/img/719/bound/2r0/55968c08c8b0db794be6b599.gif")
    interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


    if(interaction.values[0] == "kucak") {
        const öp = new EmbedBuilder()
        .setDescription(`${member} kucağına aldı bacakları okşuyor mmmh`)
        .setImage("https://cdn.discordapp.com/attachments/1190345357532606475/1213921416739823746/sweet-cuddle.gif?ex=65f73b6b&is=65e4c66b&hm=560dae1ea62403c8f1aae09f8bc8dc1c8c40241053debea165a17342520515bf&")      
        interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "öp") {
            const öp = new EmbedBuilder()
            .setDescription(`${member} gell gell yaklaşş yanıma öpücüklere boğayım seni.`)
            .setImage("https://i.pinimg.com/originals/50/6a/c6/506ac6f6a45d6b43cf545451940507bf.gif")      
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "tokat") {
            const öp = new EmbedBuilder()
            .setDescription(`${member} haaağğkkk puu Allahına kavuşturdumm.`)
            .setImage("https://media.tenor.com/QTfoz_pIxXwAAAAC/recep-recepi%CC%87vedik6.gif") 
                            
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  
                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                    }
                
                    collector.on("collect", async (interaction) => {
                        if (interaction.customId === "msj") {
                            interaction.message.delete();
                            message.delete();
                          }

                    
                
                })

}
            )
}
}