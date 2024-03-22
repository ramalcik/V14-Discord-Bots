const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const boosterSchema = require('../../../../src/schemas/booster');

module.exports = {
    conf: {
        aliases: ["boostpanel"],
        name: "boostpanel",
        help: "Booster rolü için isim değiştirme veya geri alma",
        category: "staff",
    },

    run: async (client, message, args, embed) => {
        const userID = message.author.id;
        const member = message.guild.members.cache.get(userID);
        const boosterRoleID = "1214834131767271425"; // Booster rolünün ID'sini buraya girin

        if (!member.roles.cache.has(boosterRoleID)) {
            return message.reply("Booster rolüne sahip değilsiniz!");
        }

        let boosterData = await boosterSchema.findOne({ userID });

        if (!boosterData) {
            boosterData = await new boosterSchema({
                userID,
                oldName: member.nickname || member.user.username
            }).save();
        }

        let oldName = boosterData.oldName || (member.nickname || member.user.username);

        // Butonları oluştur
        const changeButton = new ButtonBuilder()
            .setCustomId('change')
            .setLabel('İsmi Değiştir')
            .setStyle(ButtonStyle.Primary);

        const revertButton = new ButtonBuilder()
            .setCustomId('revert')
            .setLabel('Eski İsmi Geri Al')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(changeButton, revertButton);

        const embedMessage = new EmbedBuilder()
            .setTitle('Booster İsim İşlemleri')
            .setDescription('İsim değiştirme veya geri alma işlemi için aşağıdaki butonlardan birini seçin.');

        const messageToSend = await message.channel.send({ embeds: [embedMessage], components: [row] });

        const filter = i => i.user.id === message.author.id;
        const collector = messageToSend.createMessageComponentCollector({ filter, time: 60000 });
        
        collector.on('collect', async interaction => {
            if (interaction.customId === 'change') {
                // Kullanıcıya yeni ismini yazması isteniyor
                interaction.reply({ content: "Yeni isminizi yazın:", ephemeral: true });
        
                // Butonları dinlemeyi durdur
                collector.stop();
        
                // Kullanıcının mevcut adını al
                const currentName = member.nickname || member.user.username;
        
                // Eski ismi güncelle veritabanına kaydet
                await boosterSchema.findOneAndUpdate({ userID }, { oldName: currentName });
        
                // Yeni ismi kaydetmek için bir filtre oluştur
                const nameCollectorFilter = msg => msg.author.id === userID;
                // Kullanıcıdan yeni ismi almak için bir mesaj koleksiyoncusu oluştur
                const nameCollector = message.channel.createMessageCollector({ filter: nameCollectorFilter, time: 60000 });
        
                // Kullanıcı yeni ismi girdikten sonra
                nameCollector.on('collect', async msg => {
                    const newName = msg.content;
        
                    // Kullanıcının adını yeni isim olarak değiştir
                    await member.setNickname(newName);
        
                    // Kullanıcıya işlemin başarıyla gerçekleştiğini bildir
                    const finalEmbed = new EmbedBuilder()
                        .setDescription(`İsminiz başarıyla değiştirildi! Yeni isminiz: ${newName}`);
        
                    await message.channel.send({ embeds: [finalEmbed] });
        
                    // Mesaj koleksiyoncusunu durdur
                    nameCollector.stop();
                });
        
                // Mesaj koleksiyoncusu süresi dolduğunda
                nameCollector.on('end', () => {
                    // Butonları ve işlemi sonlandır
                    messageToSend.edit({ components: [] });
                });
            } else if (interaction.customId === 'revert') {
                // İsim geri alma işlemi
                if (!boosterData.oldName) {
                    await interaction.update({ content: 'Eski isminiz bulunamadı!', components: [] });
                    return;
                }
                // Eski ismi kullanarak kullanıcının adını geri döndür
                await member.setNickname(boosterData.oldName);
                // İşlem sonucunu güncelle
                await interaction.update({ content: 'Eski isminiz başarıyla geri alındı' });
        
                // Veritabanındaki eski ismi güncelle
                await boosterSchema.findOneAndUpdate({ userID }, { oldName: boosterData.oldName });
            }
        });
        
        collector.on('end', () => {
            messageToSend.edit({ components: [] });
        });
    }
}        