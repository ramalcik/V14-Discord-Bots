const Takip = require('../../../../src/schemas/takip'); // Schema dosyanızın yolunu düzgün şekilde belirtmelisiniz.
const Takipci = require("../../../../src/schemas/takipci");
const Durum = require("../../../../src/schemas/Durum");
const Canvas = require('@napi-rs/canvas');
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' });

module.exports = {
    conf: {
        aliases: ["profilim"],
        name: "profilim",
        help: "Profil bilgilerinizi gösterir.",
        category: "kullanıcı",
    },

    run: async (client, message, args, embed) => {
        try {
            const userID = message.author.id;

            // Takip edilen kişi sayısını çekme
            const takip = await Takip.findOne({ userID });
            const takipEdilenSayisi = takip ? takip.takipEdilenler.length : 0;

            // Takipçi sayısını çekme
            const takipci = await Takipci.findOne({ userID });
            const takipciSayisi = takipci ? takipci.takipciler.length : 0;

            // Kullanıcının durumunu al
            const durumData = await Durum.findOne({ userID });
            const durumMesaji = durumData ? durumData.durum : "Durum mesajı bulunmuyor.";

            // Canvas oluşturma
            const canvas = Canvas.createCanvas(800, 350); // Canvas boyutu genişletildi
            const ctx = canvas.getContext('2d');

            // Arkaplan rengi ve çerçeve oluşturma
            ctx.fillStyle = '#232626'; // Beyaz arka plan
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Kullanıcı profil fotoğrafını yükleme
            const user = message.author;
            const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: false, size: 128 });
            const avatar = await Canvas.loadImage(avatarURL);
            const iconURL = message.guild.iconURL({ format: 'png', dynamic: false, size: 128 })
            const icon = await Canvas.loadImage(iconURL);

            // Profil fotoğrafını canvas'a ekleme (sol üst köşeye yerleştirme)
            ctx.drawImage(avatar, 30, 30, 150, 150);

            // Başlık yazısı
            ctx.fillStyle = '#484848';
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`@${user.username}`, canvas.width / 3, 100); 
            // ikinci user name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 25px sans-serif';
            ctx.fillText(`${user.displayName}`, canvas.width / 3, 78); 


            // Takipçi sayısı yazısı
            ctx.font = 'bold 18px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${takipciSayisi} followers`, canvas.width / 4, 220); // Koordinatlar değiştirildi

            // Takip edilen kişi sayısı yazısı
            ctx.fillText(`${takipEdilenSayisi} following`, canvas.width / 10, 220); // Koordinatlar değiştirildi

            // Durum mesajı yazısı
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText(`Durum: ${durumMesaji}`, canvas.width / 2, 280); // Koordinatlar değiştirildi

            // Canvas'ı ekran görüntüsü olarak gönderme
            let img = canvas.toBuffer('image/png')
            message.reply({ content: ``, files: [img] })
        } catch (error) {
            console.error(error);
            return message.channel.send(`Bir hata oluştu: \`${error.message}\``);
        }
    }
};
