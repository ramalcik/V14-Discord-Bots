const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField, ButtonStyle, } = require("discord.js");
const Excuse = require("../../../../src/schemas/mazaret");
const conf = require("../../../../src/configs/sunucuayar.json")
module.exports = {
    conf: {
        aliases: ["mazaret", "excuse","mazeret"],
        name: "mazaret",
        help: "mazaret <mazaret metni>",
        category: "yetkili",
    },

    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!conf.staffs.some(x => message.member.roles.cache.has(x))) return; 
        // Kullanıcının belirttiği mazeret metnini al
        const excuseText = args.join(" ");
        if (!excuseText) return message.channel.send("Lütfen bir mazeret belirtin.");

        // Kullanıcının daha önce mazeret belirtip belirtmediğini kontrol et
        const existingExcuse = await Excuse.findOne({ authorID: message.author.id, guildID: message.guild.id });
        if (existingExcuse) return message.channel.send("Zaten bir mazaretiniz bulunmaktadır.");

        // Mazereti veritabanına kaydet
        const newExcuse = new Excuse({
            excuse: excuseText,
            authorID: message.author.id,
            guildID: message.guild.id,
            date: new Date().setHours(0, 0, 0, 0)
        });
        

        // Log kanalını bul
        const logChannel = message.guild.channels.cache.find(channel => channel.name === "mazeret_log");
        if (!logChannel) return message.channel.send("Mazeret log kanalı bulunamadı. Lütfen yetkiliye bildirin.");

 // Yetkili rolünü al
 const yetkiliRol = message.guild.roles.cache.get(conf.sahipRolu);

        // Embed oluştur
        const embeds = new EmbedBuilder()
.setDescription(`
${member} Adlı Yetkilinin Toplantıya Katılmama Mazereti;

\` Yetkili : \` ${member} [\`${member.id}\`]

\` Mazeret Bildirilme Tarihi : \` **${newExcuse.date.toLocaleString("tr-TR", { day: "numeric", month: "long", year: "numeric"})}**

\` Yetkili Mazareti : \` \` ${excuseText} \`
`)
            

        // Onayla ve Reddet düğmelerini içeren bir action row oluştur
        const actionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("onay")
                    .setLabel("Onayla")
                    .setStyle(ButtonStyle.Success), // Yetkili rolüne sahip olanlar butonu tıklayabilir
                new ButtonBuilder()
                    .setCustomId("red")
                    .setLabel("Reddet")
                    .setStyle(ButtonStyle.Danger)
            );

        // Embed ve Action Row'u log kanalına gönder
        const mazeretMessage = await logChannel.send({ embeds: [embeds], components: [actionRow] });

        // Buton
        const filter = (interaction) => conf.staffs.some(x => interaction.member.roles.cache.has(x));
        const collector = mazeretMessage.createMessageComponentCollector({ filter });

        collector.on("collect", async (interaction) => {
            if (interaction.member.id === message.author.id) { // Eğer etkileşim yapan kullanıcı mesajı gönderen kullanıcı ise
                await message.reply("Kendi Mazeretini Onaylayamazsın!")
                return; 
            }
        

            if (interaction.customId === "onay") {
                await newExcuse.save();
                await interaction.update({ content: "Mazeret onaylandı.", components: [] });
            } else if (interaction.customId === "red") {
                await interaction.update({ content: "Mazeret reddedildi.", components: [] });
            }
        });

        collector.on("end", () => {
            mazeretMessage.edit({ components: [] });
        });
        message.channel.send(`${member} Mazaret başarıyla gönderildi.`);
    },
};