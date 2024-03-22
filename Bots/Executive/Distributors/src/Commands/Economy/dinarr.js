const { MessageAttachment, MessageEmbed, Attachment } = require('discord.js');
const Bakiye = require('../../../../src/schemas/dinar'); // Counter modelini içeri aktar
const Canvas = require('@napi-rs/canvas')
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const path = require("path")
module.exports = {
    conf: {
      aliases: ["dinarr"],
      name: "dinarr",
      help: "dinarr",
      category: "kullanıcı",
    },
    run: async (client, message, args, embed, prefix) => {
        try {
            // Sunucunun kimliğini al
            const guildId = message.guild.id;

            let user = message.mentions.users.first() || message.author;

            // Kullanıcının bakiye bilgilerini MongoDB'den çekme
            let bakiye = await Bakiye.findOne({ userId: user.id, guildId: guildId });

            if (!bakiye) {
                // Eğer kullanıcı bakiye bilgisine sahip değilse, varsayılan olarak 0 bakiye varsayalım
                bakiye = await Bakiye.create({ userId: user.id, guildId: guildId });
            }

            // Kullanıcının avatarını al

            const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

            // Canvas oluşturma ve boyutlandırma
            const canvas = Canvas.createCanvas(1080, 400);

            // Canvas bağlamını al
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0 + Number(30), 0);
            ctx.lineTo(0 + 1080 - Number(30), 0);
            ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(30));
            ctx.lineTo(0 + 1080, 0 + 400 - Number(30));
            ctx.quadraticCurveTo(
            0 + 1080,
            0 + 400,
            0 + 1080 - Number(30),
            0 + 400
            );
            ctx.lineTo(0 + Number(30), 0 + 400);
            ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(30));
            ctx.lineTo(0, 0 + Number(30));
            ctx.quadraticCurveTo(0, 0, 0 + Number(30), 0);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 1080, 400);
            // Arka plan resmini yükleme
// Resmin tam yolunu belirtin
const imagePath = path.resolve(__dirname, "../../../../src/Assets/dinar.png");

// Resmi yükleyin
let backgroundImage = await Canvas.loadImage(imagePath);
            ctx.drawImage(backgroundImage, 0, 0, 1080, 400);
            ctx.restore();
            ctx.beginPath();
            ctx.globalAlpha = 0.5
            ctx.fillStyle = "#000000";

            // Kullanıcı profil resmini çizme
            ctx.save();
            ctx.beginPath();
            ctx.arc(193, 200, 130, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            let avatarImage = await Canvas.loadImage(avatarURL);
            ctx.drawImage(avatarImage, 58, 70, 270, 270);
            ctx.restore();

            // Kullanıcı ismi ve bakiye miktarı metin çizimi
            ctx.moveTo(50,  22);
            ctx.lineTo(canvas.width - 50,  22);
            ctx.quadraticCurveTo(canvas.width - 50,  22, canvas.width -  22, 50);
            ctx.lineTo(canvas.width -  22, canvas.height - 50);
            ctx.quadraticCurveTo(canvas.width - 25, canvas.height -  22, canvas.width - 50, canvas.height -  22);
            ctx.lineTo(50, canvas.height - 22);
            ctx.quadraticCurveTo(25, canvas.height -  22,  22, canvas.height - 50);
            ctx.lineTo( 22, 50);
            ctx.quadraticCurveTo( 22,  22, 50,  22);
            ctx.fill();
            ctx.globalAlpha = 1
            ctx.closePath();
            ctx.stroke();
                let gold = await Canvas.loadImage("https://cdn.discordapp.com/emojis/998212095306903653.png?size=96&quality=lossless")
                let coin = await Canvas.loadImage("https://cdn.discordapp.com/emojis/998211961462464532.png?size=96&quality=lossless")
                ctx.drawImage(gold, canvas.width - 750, 260, 85, 75);
                ctx.drawImage(coin, canvas.width - 740, 200, 75, 65);
            //draw
            ctx.font = "30px Bold";
            ctx.strokeStyle = "#e7d02e";
            ctx.lineWidth = 3;
            ctx.strokeText(`${bakiye.bakiyeMiktarı} Dinar`, canvas.width - 650, 315);
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`Bakiye: ${bakiye.bakiyeMiktarı} 💸`, 650, 315);

            ctx.fillStyle = "#000000"; 
            ctx.lineWidth = 3;
            ctx.fillStyle = "#e7d02e";
            ctx.fillText(canvas, user.tag + " UYESININ HESABI", 40, 600, "Bold");
            ctx.fillText(user.tag + " UYESININ HESABI", canvas.width - 740, canvas.height - 230);

            // Canvas'ı resme dönüştürme ve gönderme
            let img = canvas.toBuffer('image/png')
        message.reply({ content: ``,files:[img]})
        } catch (err) {
            console.error("Hata oluştu:", err);
            return message.channel.send("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }
};
