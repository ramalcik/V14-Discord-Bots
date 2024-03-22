const tasks = require("../../../../src/schemas/task");
const conf = require("../../../../src/configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["görevsil", "görev-sil","goreviptal","gorev-iptal","görev-iptal"],
    name: "görevsil",
    help: "görevsil",
    category: "yetkili"
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(x => message.member.roles.cache.has(x))) return; 

    // Kullanıcının ve sunucunun ID'sini al
    const guildID = message.guild.id;
    const userID = message.author.id;

    // Kullanıcının bu sunucuda bulunan tüm görevlerini ve tamamlanmamış görevlerini bul
    const userTasks = await tasks.find({ guildID: guildID, userID: userID, active: true });

    // Eğer kullanıcının hiç aktif görevi yoksa bilgilendir ve işlemi sonlandır
    if (userTasks.length === 0) {
      return message.reply("Aktif görev bulunamadı!");
    }

    // Aktif görevleri veritabanından sil
    await tasks.deleteMany({ guildID: guildID, userID: userID, active: true });

    // Kullanıcıya görevlerin silindiğine dair bilgi ver
    message.reply("Tüm aktif görevleriniz başarıyla silindi!");
  }
};
