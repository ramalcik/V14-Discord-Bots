const { EmbedBuilder } = require("discord.js");
const Marriage = require("../../../../src/schemas/evlilik");

module.exports = {
    conf: {
        aliases: ["evlen", "evlilikteklifi"],
        name: "evlen",
        help: "evlen <@kullanıcı>",
    },

    run: async (client, message, args) => {
        const targetMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!targetMember) return message.channel.send("Lütfen evlenmek istediğiniz kişiyi etiketleyin.");

        // Evli mi kontrol et
        const existingMarriage = await Marriage.findOne({
            $or: [
                { husbandID: message.author.id },
                { wifeID: message.author.id },
                { husbandID: targetMember.id },
                { wifeID: targetMember.id }
            ]
        });

        if (existingMarriage) {
            const isAuthorMarried = existingMarriage.husbandID === message.author.id || existingMarriage.wifeID === message.author.id;
            const isTargetMarried = existingMarriage.husbandID === targetMember.id || existingMarriage.wifeID === targetMember.id;

            if (isAuthorMarried) {
                const spouseID = existingMarriage.husbandID === message.author.id ? existingMarriage.wifeID : existingMarriage.husbandID;
                const spouse = await message.guild.members.fetch(spouseID);
                return message.channel.send(`Zaten ${spouse} ile evlisiniz ve başka birine evlenme teklifi yapamazsınız.`);
            } else {
                if (isTargetMarried) {
                    const spouseID = existingMarriage.husbandID === targetMember.id ? existingMarriage.wifeID : existingMarriage.husbandID;
                    const spouse = await message.guild.members.fetch(spouseID);
                    return message.channel.send(`Bu kişi zaten ${spouse} ile evli ve başka bir evlilik teklifi alamaz.`);
                } else {
                    return message.channel.send("Bu kişi zaten evli ve başka bir evlilik teklifi alamaz.");
                }
            }
        }

        // Evlenme teklifi mesajı
        const embed = new EmbedBuilder()
            .setColor("#ff69b4")
            .setTitle(`${targetMember.user.username}, ${message.author.username} sana evlenme teklif ediyor! 💍`)
            .setDescription(`Evlilik teklifini kabul etmek için ✅ emojisine, reddetmek içinse ❌ emojisine tıklayın.`);

        const proposalMessage = await message.channel.send({ embeds: [embed] });
        await proposalMessage.react("✅");
        await proposalMessage.react("❌");

        // Reaksiyonları filtrele
        const filter = (reaction, user) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === targetMember.id;
        const collector = proposalMessage.createReactionCollector({ filter, time: 60000 });

        collector.on("collect", async (reaction) => {
            if (reaction.emoji.name === "✅") {
                // Evlilik kaydını oluştur
                const marriage = new Marriage({
                    husbandID: message.author.id,
                    wifeID: targetMember.id,
                    marriedAt: new Date()
                });

                await marriage.save();

                // Evlileri belirleme
                const husband = await message.guild.members.fetch(marriage.husbandID);
                const wife = await message.guild.members.fetch(marriage.wifeID);

                // Evli rollerini verme
                const role = message.guild.roles.cache.find(role => role.name === "Evliler");
                if (role) {
                    husband.roles.add(role);
                    wife.roles.add(role);
                }

                message.channel.send(`${targetMember}, ${message.author} ile evlendi! 🎉`);
                collector.stop();
            } else if (reaction.emoji.name === "❌") {
                message.channel.send(`${targetMember} evlilik teklifini reddetti.`);
                collector.stop();
            }
        });

        collector.on("end", () => {
            proposalMessage.reactions.removeAll().catch(console.error);
        });
    },
};