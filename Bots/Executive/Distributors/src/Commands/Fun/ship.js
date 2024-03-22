const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser, hyperlink, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Canvas = require("canvas")
const conf = require("../../../../src/configs/sunucuayar.json")
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const ayar = require("../../../../src/configs/ayarName.json")
const roller = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../config.json")
const { red } = require("../../../../src/configs/emojis.json")
const path = require('path');
let cooldown = new Map()
module.exports = {
  conf: {
    aliases: ["ship"],
    name: "ship",
    help: "ship",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
    if(!message.channel.name.includes("ship")) return message.reply(`Bu Komutu Sadece ${message.guild.channels.cache.filter(x => x.name.includes("ship")).map(x => x).join(", ")} kanallarında kullanabilirsiniz.`).then(x => {
        message.react(red)
        setTimeout(() => {x.delete()}, 5000)
        })
    if(cooldown.get(message.member.id)) return message.reply({content: `Bu komutu **5** saniyede bir kullanabilirsiniz. ${cevaplar.prefix}`}).then(x => setTimeout(() => {
        x.delete().catch(err => {})
    }, 7500));
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!member || message.author.id === member.id) {
        member = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !roller.unregRoles.some(x => m.roles.cache.get(x))) 
       .random();
       if(roller.erkekRolleri.some(x => message.member.roles.cache.has(x))) member = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !roller.unregRoles.some(x => m.roles.cache.get(x)) && roller.kizRolleri.some(x => m.roles.cache.get(x))) 
       .random();
       if(roller.kizRolleri.some(x => message.member.roles.cache.has(x))) member = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !roller.unregRoles.some(x => m.roles.cache.get(x)) && roller.erkekRolleri.some(x => m.roles.cache.get(x))) 
       .random();
       
    }

  let emoji = client.emojis.cache.find(x => x.name === "kalps")  // sunucunda kalps adında emoji olursa gösterir

const randomYear = Math.floor(Math.random() * 10 + 2023); // 2010 ile 2020 arasında rastgele bir yıl
const randomMonth = Math.floor(Math.random() * 12 + 1); // 1 ile 12 arasında rastgele bir ay
const randomDay = Math.floor(Math.random() * 28 + 1); // 1 ile 28 arasında rastgele bir gün

const marriageDate = new Date(randomYear, randomMonth, randomDay);

const girlNames = ['Ada', 'Adal', 'Adile', 'Adriana', 'Ahu', 'Alev', 'Aliye', 'Alya', 'Alyaç', 'Alyaşa', 'Anıl', 'Arzu', 'Aslı', 'Aslıhan', 'Asya', 'Aybala', 'Aybike', 'Ayça', 'Aysel', 'Ayşe', 'Ayşen', 'Ayten', 'Ayşe Nur', 'Azra', 'Azize', 'Bahar', 'Bahtınur', 'Begüm', 'Belgin', 'Bengi', 'Bengisu', 'Beren', 'Berfin', 'Berrin', 'Betül', 'Beyza', 'Bilge', 'Bilgehan', 'Bilgenur', 'Binnur', 'Biran', 'Birsen', 'Büşra', 'Canan', 'Candan', 'Cansu', 'Ceyda', 'Ceylan', 'Cihan', 'Cihanur', 'Cemre', 'Ceren', 'Ceylan', 'Çağla', 'Çiğdem', 'Çiğdem', 'Çiçek', 'Damlanur', 'Defne', 'Deniz', 'Derya', 'Dicle', 'Didem', 'Dilan', 'Dilek', 'Dolunay', 'Duru', 'Duygu', 'Eda', 'Ebru', 'Ece', 'Ecrin', 'Edanur', 'Ediz', 'Ela', 'Elanur', 'Elif', 'Eliz', 'Elmas', 'Elvan', 'Emine', 'Emre', 'Eray', 'Esila', 'Esin', 'Eslem', 'Esma', 'Esmanur', 'Eylem', 'Eylül', 'Ezgi', 'Fadime', 'Fatoş', 'Fatma', 'Fazilet', 'Feride', 'Feride', 'Ferihan', 'Ferzane', 'Feyza', 'Figen', 'Funda', 'Gamze', 'Gaye', 'Gizem', 'Gizem', 'Gökçe', 'Gönül', 'Gözde','Ada', 'Adal', 'Adile', 'Adriana', 'Ahu', 'Alev', 'Aliye', 'Alya', 'Alyaç', 'Alyaşa', 'Anıl', 'Arzu', 'Aslı', 'Aslıhan', 'Asya', 'Aybala', 'Aybike', 'Ayça', 'Aysel', 'Ayşe', 'Ayşen', 'Ayten', 'Ayşe Nur', 'Azra', 'Azize', 'Bahar', 'Bahtınur', 'Begüm', 'Belgin', 'Bengi', 'Bengisu', 'Beren', 'Berfin', 'Berrin', 'Betül', 'Beyza', 'Bilge', 'Bilgehan', 'Bilgenur', 'Binnur', 'Biran', 'Birsen', 'Büşra', 'Canan', 'Candan', 'Cansu', 'Ceyda', 'Ceylan', 'Cihan', 'Cihanur', 'Cemre', 'Ceren', 'Ceylan', 'Çağla', 'Çiğdem', 'Çiğdem', 'Çiçek', 'Damlanur', 'Defne', 'Deniz', 'Derya', 'Dicle', 'Didem', 'Dilan', 'Dilek', 'Dolunay', 'Duru', 'Duygu', 'Eda', 'Ebru', 'Ece', 'Ecrin', 'Edanur', 'Ediz', 'Ela', 'Elanur', 'Elif', 'Eliz', 'Elmas', 'Elvan', 'Emine', 'Emre', 'Eray', 'Esila', 'Esin', 'Eslem', 'Esma', 'Esmanur', 'Eylem', 'Eylül', 'Ezgi', 'Fadime', 'Fatoş', 'Fatma', 'Fazilet', 'Feride', 'Feride', 'Ferihan', 'Ferzane', 'Feyza', 'Figen', 'Funda', 'Gamze', 'Gaye', 'Gizem', 'Gizem', 'Gökçe', 'Gönül', 'Gözde', 'Gülden', 'Gülay', 'Gülcan', 'Gülnur', 'Gülşah', 'Gülsüm', 'Güzel', 'Gülizar', 'Hacer', 'Hafize', 'Hale', 'Halime', 'Handan', 'Hanife', 'Hasret', 'Hatice', 'Hayal', 'Hayat', 'Hayriye', 'Hazal', 'Helin', 'Hilal', 'Hülya', 'Hüma', 'Hümeyra', 'Irmak', 'İdil', 'İlayda', 'İlknur', 'İpek', 'İrem', 'İrem', 'İnci', 'Jale', 'Jasmin', 'Kader', 'Kamile', 'Kardelen', 'Karolina', 'Kübra', 'Lale', 'Lalehan', 'Lara', 'Lavin', 'Leyla', 'Lina', 'Mavi', 'Maya'];

const boyNames = ['Ahmet','Ali','Ayhan','Barış','Burak','Can','Cem','Cihan','Emre','Eren','Furkan','Gökhan','Hakan','Hasan','İbrahim','Kaan','Mehmet','Murat','Mustafa','Onur','Ömer','Serkan','Tuncay','Uğur','Volkan','Yasin','Yusuf','Adem','Ahmet','Akın', 'Alp', 'Arda', 'Arif', 'Armağan', 'Aslan', 'Aydın', 'Ayhan', 'Aziz', 'Barış' ,'Batuhan', 'Berk', 'Berke' ,'Bilal', 'Caner', 'Celal', 'Cemal', 'Cengiz', 'Cihan', 'Cemil','Deniz','Devrim','Doğan','Ege','Eren','Emir', 'Emrah','Enes', 'Erdem', 'Erhan', 'Erol','Faruk', 'Fatih', 'Ferhat', 'Ferit' ,'Fırat', 'Fikret' ,'Gökhan', 'Güven', 'Hakan', 'Halil', 'Hamza', 'Harun' ,'Hasan' ,'Haydar' ,'Hüseyin' ,'İbrahim', 'İdris', 'İlhan', 'İsmail', 'Kadir' ,'Kamil' ,'Kemal' ,'Kerem' ,'Levent', 'Mehmet', 'Metin', 'Mert', 'Murat' ,'Mustafa', 'Nail', 'Nihat' ,'Oğuz' ,'Onur', 'Osman', 'Ömer', 'Özgür', 'Raşit' ,'Rıza', 'Salih', 'Selim', 'Serdar', 'Serhat', 'Serkan', 'Sinan' ,'Süleyman', 'Talha', 'Tamer', 'Taner' ,'Tarık', 'Tuncay', 'Ufuk', 'Uğur' ,'Volkan' ,'Yaşar', 'Yasin', 'Yavuz', 'Yılmaz', 'Yunus', 'Yusuf' ,'Zeki','Adil', 'Aksel', 'Alper', 'Altan', 'Aras', 'Atakan', 'Atilla', 'Aybars', 'Aydemir', 'Ayhan', 'Aykut', 'Aziz', 'Baha', 'Baran', 'Berkay', 'Bora', 'Bulut', 'Cenk', 'Cevat', 'Cihan', 'Coşkun', 'Cüneyt', 'Çağan', 'Çetin', 'Demir', 'Deniz', 'Doruk', 'Efe', 'Ege', 'Egehan', 'Ercan', 'Eren', 'Ertan', 'Evren', 'Fatih', 'Ferdi', 'Fırat', 'Genco', 'Gökay', 'Gökhan', 'Görkem', 'Güçlü', 'Hakan', 'Haluk', 'Harun', 'İlker', 'İlyas', 'İsmet', 'Kaan', 'Kadir', 'Kamuran', 'Kaya', 'Kemal', 'Kerem', 'Koray', 'Kuzey', 'Levent', 'Mehmet', 'Mert', 'Murat', 'Mustafa', 'Nadir', 'Necip', 'Nihat', 'Okan', 'Orhan', 'Orkun', 'Osman', 'Ömer', 'Önder', 'Özcan', 'Özgür', 'Ramazan', 'Rıdvan', 'Sarp', 'Serkan', 'Sinan', 'Suat', 'Süleyman', 'Tahsin', 'Talat', 'Taner', 'Tarık', 'Timur', 'Tolga', 'Ufuk', 'Umut', 'Utku', 'Ümit', 'Volkan', 'Yağız', 'Yalçın', 'Yasin', 'Yavuz', 'Yiğit', 'Yunus', 'Yusuf', 'Zafer', 'Zeki'];

const songNames = ["https://www.youtube.com/watch?v=UXK9s54VmxQ","https://www.youtube.com/watch?v=JILBG2qp8ug","https://www.youtube.com/watch?v=HirFutbbIWg","https://www.youtube.com/watch?v=V_tACrGT7vo","https://www.youtube.com/watch?v=PtsMi4dtl1o","https://www.youtube.com/watch?v=E6lNDqIcbNU","https://www.youtube.com/watch?v=uwAzVelfo2s","https://www.youtube.com/watch?v=NHuHgLvuUj8","https://www.youtube.com/watch?v=KQctFXQloFY","https://www.youtube.com/watch?v=oIxHiZApcGs","https://www.youtube.com/watch?v=Hym1DW96tXk",'https://www.youtube.com/watch?v=Pg_6X5jcZ8I','https://www.youtube.com/watch?v=MqtUcxViLQY','https://www.youtube.com/watch?v=2XYc5N8gNYA','https://www.youtube.com/watch?v=XHwOPkFMtZg','https://www.youtube.com/watch?v=OJqmzM29hWM','https://www.youtube.com/watch?v=tdOSIkWoybg','https://www.youtube.com/watch?v=IkVTPJsXYKM','https://www.youtube.com/watch?v=aJX6wM6-xl8','https://www.youtube.com/watch?v=xrpasFa2tIQ','https://www.youtube.com/watch?v=kv-z81V8BnQ','https://www.youtube.com/watch?v=tLxsEYR9UFQ','https://www.youtube.com/watch?v=40AQBO2JVWo','https://www.youtube.com/watch?v=FVY4be1yFFY','https://www.youtube.com/watch?v=2XYc5N8gNYA&list=RD2XYc5N8gNYA&start_radio=1','https://www.youtube.com/watch?v=GpTtkYhA1vE&list=RD2XYc5N8gNYA&index=4','https://www.youtube.com/watch?v=xrpasFa2tIQ&list=RD2XYc5N8gNYA&index=7','https://www.youtube.com/watch?v=MqtUcxViLQY','https://www.youtube.com/watch?v=wiBXrkka-YA','https://www.youtube.com/watch?v=13GGURZHXeE','https://www.youtube.com/watch?v=xm64CTIQ6GA','https://www.youtube.com/watch?v=LtbLe9htSQ0','https://www.youtube.com/watch?v=uJjwhbWjC7A&list=RDMMuJjwhbWjC7A&start_radio=1','https://www.youtube.com/watch?v=fQBqaga9ElU&list=RDMMuJjwhbWjC7A&index=6','https://www.youtube.com/watch?v=ErqsXleJf9E&list=RDMMuJjwhbWjC7A&index=7','https://www.youtube.com/watch?v=s5JrG2kwEuM','https://www.youtube.com/watch?v=xrIfIzg4ONg','https://www.youtube.com/watch?v=VWaT_BoUbqE','https://www.youtube.com/watch?v=9wfn83-n6Mw','https://www.youtube.com/watch?v=A5QI77d6OUg','https://www.youtube.com/watch?v=llnICQ-iOxs','https://www.youtube.com/watch?v=Ik0jn1XrfHY','https://www.youtube.com/watch?v=Pg_6X5jcZ8I','https://www.youtube.com/watch?v=x6WIaylMrmM'];
const randomSong = Math.random() < 0.5 ? 'name': 'name' // Rastgele bir cinsiyet seçimi
let randomMüzik;

if (randomSong === 'name') {
randomMüzik = songNames[Math.floor(Math.random() * songNames.length)];
randomMüzik += " Şarkısını Size Layık Gördüm 💞";
} else {
randomMüzik = songNames[Math.floor(Math.random() * songNames.length)];
randomMüzik += " Şarkısını Size Layık Gördüm 💞";
}


const gender = Math.random() < 0.5 ? 'Kız' : 'Erkek'; // Rastgele bir cinsiyet seçimi

let randomName;

if (gender === 'Kız') {
randomName = girlNames[Math.floor(Math.random() * girlNames.length)];
// Kız çocuğu isteği mesajı
randomName += " ismini veriyorum çünkü siz en çok kız çocuğu istiyorsunuz 👉 👈";
} else {
randomName = boyNames[Math.floor(Math.random() * boyNames.length)];
// Erkek çocuğu isteği mesajı
randomName += " ismini veriyorum çünkü siz en çok erkek çocuğu istiyorsunuz 👉 👈";
}
  
    
const özelKullanıcılar = [""];// buraya hangi ID girersen full çıkar ikisine attığında ship

let love;
let emoticon;

if (özelKullanıcılar.includes(member.id)) {
love = 'Birbiriniz İçin Yaratılmışsınız 👉 👈';
emoticon = 'https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429';
} else {
let replies = [
    '%5',     '%3',
    '%10',    '%14',
    '%17',    '%20',
    '%22',    '%25',
    '%24',    '%27',
    '%32',    '%36',
    '%34',    '%39',
    '%42',    '%45',
    '%47',    '%51',
    '%54',    '%56',
    '%59',    '%58',
    '%60',    '%63',
    '%65',    '%64',
    '%68',    '%70',
    '%74',    '%78',
    '%79',    '%80',
    '%83',    '%86',
    '%84',    '%89',
    '%91',    '%93',
    '%95',    '%97',
    '%98',    '%99',
    'Birbiriniz İçin Yaratılmışsınız 👉 👈',   'Birbiriniz İçin Yaratılmışsınız 👉 👈'
];
let emoti = Math.floor(Math.random() * replies.length);
love = replies[emoti];

if (emoti <= 44 && emoti >= 23) {
    emoticon = 'https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429';
} else if (emoti < 23 && emoti >= 12) {
    emoticon = 'https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529';
} else if (emoti < 12) {
    emoticon = 'https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900';
}
}
  
  
    const canvas = Canvas.createCanvas(384, 128);
    const ctx = canvas.getContext('2d');
    const emotes = await Canvas.loadImage(emoticon);
    const avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ extension: "png" } ));
    const avatar2 = await Canvas.loadImage(member.displayAvatarURL ({ extension: "png" }));
    ctx.beginPath();
    ctx.moveTo(0 + Number(10), 0);
    ctx.lineTo(0 + 384 - Number(10), 0);
    ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
    ctx.lineTo(0 + 384, 0 + 128 - Number(10));
    ctx.quadraticCurveTo(
    0 + 384,
    0 + 128,
    0 + 384 - Number(10),
    0 + 128
    );
    ctx.lineTo(0 + Number(10), 0 + 128);
    ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
    ctx.lineTo(0, 0 + Number(10));
    ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    const imagePath = path.resolve(__dirname, "../../../../src/Assets/ship.png");
    
    // Resmi yükleyin
    let background = await Canvas.loadImage(imagePath);
    ctx.drawImage(background, 0, 0, 384, 129);
    ctx.beginPath();
    ctx.globalAlpha = 0.5
    ctx.fillStyle = "#000000";
    
    //ctx.fillRect(50, 30, 980, 350);
    
    ctx.fillStyle = "#000000";
ctx.globalAlpha = 0.5;
ctx.fillRect(55, 5, 275, 115);
ctx.globalAlpha = 1;
    
    ctx.drawImage(avatar1, 70, 12, 100, 100);
    ctx.drawImage(avatar2, 215, 12, 100, 100);
    ctx.drawImage(emotes, 150, 20, 75, 75);
    const img = new AttachmentBuilder(canvas.toBuffer(), 'ship.png')
   let Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel('Mesajı Sil')
        .setCustomId("test")
        .setEmoji("1065600543172591616")
        .setStyle(2),
         new ButtonBuilder()
        .setStyle(2)
        .setLabel('Kullanıcıyı Görüntüle')
        .setEmoji('1086334689058504734')
        .setCustomId('user')
    )
    
     let Rows = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel('Mesajı Sil')
        .setCustomId("test")
        .setEmoji("1065600543172591616")
        .setStyle(2),
        new ButtonBuilder()
        .setStyle(2)
        .setLabel('İkinizin Şarkısı ')
        .setEmoji('1110580985369739397')
        .setCustomId('song'),
         new ButtonBuilder()
        .setStyle(2)
        .setLabel('Kullanıcıyı Görüntüle')
        .setEmoji('1086334689058504734')
        .setCustomId('user')
    )
 
if (love >= '%60') {
message.reply({
components: [Rows],
content: `${member}`,
content: `
${client.emojis.cache.find(x => x.name === "kalpcik")} **Aşk Oranınız; ${love}**
**Evlenme Tarihiniz;** <t:${Math.floor(marriageDate.getTime() / 1000)}:D> [__<t:${Math.floor(marriageDate.getTime() / 1000)}:R>__]
**Gelecekteki Çocuğunuzun Adı;** **${randomName}**`,
files: [img]
}).then(async (msg) => {
var filter = (i) => i.user.id == message.member.id;
let collector = msg.createMessageComponentCollector({ filter: filter, time: 25000 });
collector.on('collect', async (interaction) => {
  if (interaction.customId === "test") {
    interaction.message.delete();
    message.delete();
  }
  if(interaction.customId === "user") {
Rows.components[2].setDisabled(true)
msg.edit({ components: [Rows] })
interaction.reply({ content: `> ${member}`, ephemeral: true})
}
if(interaction.customId === "song") {
Rows.components[1].setDisabled(true)
msg.edit({ components: [Rows] })
interaction.reply({ content: `> ${randomMüzik}`, ephemeral: true})
}
})
 collector.on("end", async (_, reason) => {
  if (reason === "time") {
    Rows.components[0].setDisabled(true);
    Rows.components[1].setDisabled(true);
    Rows.components[2].setDisabled(true);

    if (msg) msg.edit({ components: [Rows] });
  }
});
})
} else {
message.reply({
components: [Row],
content: `${member}`,
content: `
${client.emojis.cache.find(x => x.name === "kalpcik")} **Aşk Oranınız; ${love}**
**Evlenmek İçin Uygun Değilsiniz :(**`,
files: [img]
}).then(async (msg) => {
var filter = (i) => i.user.id == message.member.id;
let collector = msg.createMessageComponentCollector({ filter: filter, time: 25000 });
collector.on('collect', async (interaction) => {
  if (interaction.customId === "test") {
    interaction.message.delete();
    message.delete();
  }
if(interaction.customId === "user") {
Row.components[1].setDisabled(true)
msg.edit({ components: [Row] })

interaction.reply({ content: `> ${member}`, ephemeral: true})
      }
});

collector.on("end", async (_, reason) => {
  if (reason === "time") {
    Row.components[0].setDisabled(true);
    Row.components[1].setDisabled(true);
    if (msg) msg.edit({ components: [Row] });
  }
});
});
}
}
  }

