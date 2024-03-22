const { AuditLogEvent, PermissionsBitField, TextInputStyle, TextInputBuilder, ModalBuilder, ChannelType, ButtonStyle, ComponentType, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green,Tac,  nokta } = require("../../../../src/configs/emojis.json");
const datas  = require("../../../../src/schemas/secretRoom");
const datas2  = require("../../../../src/schemas/secretRoomStat");
const { relativeTimeRounding } = require("moment");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["secretroom","secretroom"],
    name: "secretroom",
    help: "secretroom",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    if (!client.guilds || !client.guilds.cache) {
        return console.log("client.guilds veya client.guilds.cache tanımsız.");
      }
  
      const guild = client.guilds.cache.get(allah.GuildID);

    let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder() 
        .setCustomId("create")
        .setLabel("Oluştur")
        .setStyle(ButtonStyle.Secondary)
    )

    let papaz = new EmbedBuilder()
.setDescription(`\`\`\`fix
# Özel Oda Sistemi Bilgilendirmesi.\`\`\`

Sunucuda bulunan özel oda sistemi buradaki butonlar yardımı ile ayarlanabilir , kontrol edilebilir ve size özel bir hale gelmiş olur. Aşağıda butonlar hakkında bilgi verilmiştir.

${Tac} **Kullanıcı Ekle:** Girdiğiniz ID 'ye sahip kişi odanıza giriş yapabilir.
${Tac} **Kullanıcı Kaldır:** Girdiğiniz ID 'ye sahip kişinin odaya girme izni kaldırılır.
${Tac} **Sesten At:** Odanızdaki kişiyi sesten atar.
${Tac} **İsim Değiştir:** Odanızın İsmi Değişir.
${Tac} **Oda Limiti:** Odanızın kullanıcı limitini belirlersiniz.
    
${green} **NOT:** Eğer odanız herkese kitli durumdaysa ve bir yetkili sizden izinsiz odanıza girerse bunu sunucu yönetimine bildiriniz.    
    
    
    `)
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.reply({ embeds: [papaz] , components: [row]})

  },
};

client.on('interactionCreate', async interaction => {
    if(interaction.customId === "create") {
        const data = await datas.findOne({ Owner: interaction.user.id });
        const xd = await client.guilds.cache.get(allah.GuildID).channels.cache.get(data?.ID)

        if (data?.ID && xd) return interaction.reply({ content: `<@${interaction.user.id}> zaten özel odanız var.`, ephemeral: true })

        const createRoom = new ModalBuilder()
        .setCustomId('createroom')
        .setTitle('Oda oluştur');

            let xname5 = new TextInputBuilder()
            .setCustomId('name')
            .setLabel('Oda ismi giriniz!')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(20)
            .setRequired(true);
            let xlimit5 = new TextInputBuilder()
            .setCustomId('limit')
            .setLabel('Oda limiti giriniz!')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true);

        const xname6 = new ActionRowBuilder().addComponents(xname5);
		const xlimit6 = new ActionRowBuilder().addComponents(xlimit5);

		createRoom.addComponents(xname6, xlimit6);

        interaction.showModal(createRoom, {
            client: client,
            interaction: interaction
        })
      }
    });

client.on('interactionCreate', async interaction => {
const Guild = client.guilds.cache.get(allah.GuildID);
const room = await datas.findOne({ Owner: interaction.user.id });
const Channel = Guild?.channels.cache.get(room?.ID);

    if(interaction.customId === "pompalamasyon1") {
    if (!room) { 
    await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
    return }
        await Guild?.channels?.cache.get(room?.ID)?.permissionOverwrites.edit(allah.GuildID, { Connect: false });
        await interaction.reply({ content: `**${Channel.name}** kanalını başarıyla girişlere kitlediniz.`, ephemeral: true })
    } else if (interaction.customId === "pompalamasyon2") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        await Guild?.channels?.cache.get(room?.ID)?.permissionOverwrites.edit(allah.GuildID, { Connect: true });
        await interaction.reply({ content: `**${Channel.name}** kanalını başarıyla girişlere açtınız.`, ephemeral: true })
    } else if (interaction.customId === "pompalamasyon3") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        await Guild?.channels?.cache.get(room?.ID)?.permissionOverwrites.edit(allah.GuildID, { ViewChannel: false });
        await interaction.reply({ content: `**${Channel.name}** kanalını başarıyla gizlediniz.`, ephemeral: true })
    } else if (interaction.customId === "pompalamasyon4") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        await Guild?.channels?.cache.get(room?.ID)?.permissionOverwrites.edit(allah.GuildID, { ViewChannel: true });
        await interaction.reply({ content: `**${Channel.name}** kanalını başarıyla kullanıcılara görünür yaptınız.`, ephemeral: true })
    } else if (interaction.customId === "pompalamasyon5") {
        const pro = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder().setCustomId("onays").setLabel("Kabul Et").setStyle(ButtonStyle.Success).setEmoji("915754671728132126"),
        new ButtonBuilder().setCustomId("reds").setLabel("Reddet").setStyle(ButtonStyle.Danger).setEmoji("920412153712889877"),
        );
      
        const rooms = await datas.findOne({ ID: interaction.channel.id });

        if (rooms.Owner === interaction.user.id) { 
        await interaction.reply({ content: `Zaten kanal sahibi sizsiniz.`, ephemeral: true })
        return }  

        interaction.deferUpdate(true)
        let proozi = new EmbedBuilder()  
        .setDescription(`<@${rooms.Owner}>, <@${interaction.user.id}> oda sahipliğini senden almak istiyor. Kabul ediyor musun?`)
        .setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.`})
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      
        let msg = await interaction.channel.send({ content: `<@${rooms.Owner}>`, embeds: [proozi], components: [pro] })
        var filter = button => button.user.id === rooms.Owner;
        let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
      
        collector.on("collect", async (button) => {
        if (button.customId === "onays") {
            const embeds = new EmbedBuilder()
            .setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({ dynamic: true, size: 2048 })})
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`<@${interaction.user.id}>, <@${rooms.Owner}> kişisinden oda sahipliğini üzerine aldın.`)
            await datas.updateOne({ Owner: rooms.Owner }, { $set: { Owner: interaction.user.id } }, { upsert: true });

            collector.stop();
            button.reply({ embeds: [embeds], components: [] })
        }
      
        if (button.customId === "reds") {
            const embedss = new EmbedBuilder()
            .setAuthor({ name: client.guilds.cache.get(allah.GuildID).name, iconURL: client.guilds.cache.get(allah.GuildID).iconURL({ dynamic: true, size: 2048 })})
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`<@${interaction.user.id}>, <@${rooms.Owner}> kişisinden oda sahipliği alma işlemi iptal edildi.`)

            collector.stop();
            button.reply({ embeds: [embedss], components: [] })
        }
    });
    collector.on('end', i => {
       msg.delete();
    })
    } else if (interaction.customId === "pompalamasyon6") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        const filter = m => m.author === interaction.user;
        var cevaplar = {};
        xdd: cevaplar["xd"]

        await interaction.reply({ content: `Lütfen kanalınıza girmesini istediğiniz üye(leri) etiketleyiniz. \`Örn: @reazgan\``, ephemeral: true })
        interaction.channel.awaitMessages({filter, max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["xd"] = msj.mentions.users);
        
        const members = cevaplar["xd"]
        .filter((x) => !room?.Users.includes(x.id) && interaction.guild.members.cache.has(x.id))
        .map((x) => interaction.guild.members.cache.get(x.id));

        if (Guild?.channels.cache.get(room.ID)?.manageable) {
        members.map((member, idx) =>
        Guild?.channels.cache.get(room.ID).permissionOverwrites.edit(member.id, { ViewChannel: true, Connect: true }).then(async () =>
        await datas.findOneAndUpdate({ Owner: interaction.user.id }, {$push: { Users: member.id }}, {upsert: true}))
        )
    }
        await interaction.followUp({ content: `${members.map((member, idx) => `${member.toString()}`).join(", ")} üyelerinin kanalınıza girmesine başarıyla izin verdiniz.`, ephemeral: true })
})
    } else if (interaction.customId === "pompalamasyon7") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        const members = room.Users.map((x) => {
            return {
                label: interaction.guild.members.cache.get(x)?.user?.tag ?? x,
                description: `Üyenin erişimini kaldırmak için tıkla`,
                value: x
            }
        });

        if (!members?.length) {
        interaction.reply({ content: `Odanızdan çıkarılacak üye bulunmamaktadır.`, ephemeral: true })
        return };
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder().setCustomId("members").setPlaceholder('Listeyi Görüntüle').addOptions([...members])
        );
        interaction.deferUpdate(true)
       let yarak = await interaction.channel.send({ content: `Odaya erişimini kaldırmak istediğiniz üyeleri listeden seçiniz.`, components: [row]});
            const filter = i => {
                i.deferUpdate();
                return i.user.id === interaction.user.id;
            };

            yarak.awaitMessageComponent({ filter, componentType: ComponentType.StringSelect, time: 60000 }).then((x) => {
                x.values.map(async (v) => {
                    await datas.findOneAndUpdate({ Owner: interaction.user.id }, {$pull: {Users: v}}, {upsert: true});
                    await Channel?.permissionOverwrites.delete(v)
                    let memb = client.guilds.cache.get(allah.GuildID).members.cache.get(v)
                    if (memb && memb.voice && memb.voice.channel) {
                        memb.voice.disconnect();
                      }
                });
                if (yarak) yarak.delete();
                interaction.channel.send({ content: `${green} Başarılı bir şekilde <@${x.values}> adlı üyenin odanıza erişim izni silindi.` });
                });
    } else if (interaction.customId === "pompalamasyon8") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        const editRoom = new ModalBuilder()
        .setCustomId('edit2')
        .setTitle(`${room?.Name} odasını düzenleyin`);

            let xname = new TextInputBuilder()
            .setCustomId('name')
            .setLabel('Oda isminizi giriniz!')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(20)
            .setValue(room?.Name)
            .setRequired(false);

            let xlimit = new TextInputBuilder()
            .setCustomId('limit')
            .setLabel('Oda limiti giriniz!')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setPlaceholder(`Limit: ${room?.MaxUser ?? 0}`)
            .setRequired(false);

        const xname2 = new ActionRowBuilder().addComponents(xname);
		const xlimit2 = new ActionRowBuilder().addComponents(xlimit);

		editRoom.addComponents(xname2, xlimit2);

        interaction.showModal(editRoom, {
            client: client,
            interaction: interaction
        })
    } else if (interaction.customId === "pompalamasyon9") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        return }    
        const filter = m => m.author === interaction.user;
        var cevaplar = {};
        xddD: cevaplar["xdD"]

        await interaction.reply({ content: `Kanal sahipliğini aktarmak istediğiniz üyeyi etiketleyiniz. \`Örn: @reazgan\``, ephemeral: true })
        interaction.channel.awaitMessages({ filter, max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["xdD"] = msj.mentions.users);
        
        const members = cevaplar["xdD"]
        .filter((x) => interaction.guild.members.cache.has(x.id))
        .map((x) => interaction.guild.members.cache.get(x.id));

        if (members.length > 1) {
        interaction.followUp({ content: `Sahiplik aktarma işleminde birden fazla üye belirtemezsin.`, ephemeral: true })
        return }

        await datas.updateOne({ Owner: interaction.user.id }, { $set: { Owner: members[0].user.id } }, { upsert: true });
        interaction.followUp({ content: `${members.map((member, idx) => `${member.toString()}`).join(", ")} üyesini yeni kanal sahibi olarak belirlediniz.`, ephemeral: true });
})
    } else if (interaction.customId === "pompalamasyon10") {
        if (!room) { 
        await interaction.reply({ content: `Kanal sahibi olmadığınız için bu butonu kullanamazsınız.`, ephemeral: true })
        if (Guild.channels.cache.get(room?.ID) && Guild.channels.cache.get(room?.ID)?.deletable) Guild.channels.cache.get(room?.ID)?.delete("Oda sahibi tarafından silindi.");
        return } 
        await datas.deleteMany({ Owner: interaction.user.id });
        interaction.reply({ content: `🗑️ <@${interaction.user.id}> **${room?.Name ?? "Bilinmeyen Oda"}** isimli oda başarılı bir şekilde silindi.`, ephemeral: true })
        if (Guild.channels.cache.get(room?.ID) && Guild.channels.cache.get(room?.ID)?.deletable) Guild.channels.cache.get(room?.ID)?.delete("Oda sahibi tarafından silindi.");
    }
});

client.on("interactionCreate", async (modal) => {
    if (!modal.isModalSubmit()) return;
    const Guild = client.guilds.cache.get(allah.GuildID);
    const room = await datas.findOne({ Owner: modal.user.id });

    if (modal.customId === "createroom") {
        const roomName = modal.fields.getTextInputValue("name");
        const roomLimit = modal.fields.getTextInputValue("limit");
        if (isNaN(roomLimit)) return;

        await Guild.channels.create({ name: roomName,
            type: ChannelType.GuildVoice,
            userLimit: roomLimit > 99 ? 99 : roomLimit,
            parent: conf.secretroomParent,
            permissionOverwrites: [{
            id: allah.GuildID,
            allow: [PermissionsBitField.Flags.ViewChannel],
            deny: [PermissionsBitField.Flags.Connect],
          },
          {
            id: modal.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
          }
        ]
          }).then(async (c) => {
            new datas({
                ID: c.id,
                Owner: modal.user.id,
                Name: roomName,
                Users: [],
                Duration: 0,
                LastJoin: Date.now(),
                MaxUser: roomLimit > 99 ? 99 : roomLimit
            }).save()

            let row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("pompalamasyon1")
                .setLabel("Oda Kilitle")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon2")
                .setLabel("Oda Kilidini Aç")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon3")
                .setLabel("Oda Gizle")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon4")
                .setLabel("Oda Gizle Aç")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon5")
                .setLabel("Oda Aktar")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
            );
            let row3 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("pompalamasyon6")
                .setLabel("Kullanıcı Ekle")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon7")
                .setLabel("Kullanıcı Kaldır")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon8")
                .setLabel("Oda Düzenle")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon9")
                .setLabel("Kanal Aktar")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("pompalamasyon10")
                .setLabel("Oda Kaldır")
                .setEmoji("1206657814089441362")
                .setStyle(ButtonStyle.Secondary),
            );

const invite = await c.createInvite({ maxUses: 100 });

const embed = new EmbedBuilder()
.setDescription(`
[${Guild.name}](https://discord.gg/${invite.code})

Ses kanalını butonlara tıklayarak kontrol edebilirsin.

**Buton Kullanım**
・ Ses kanalını [\`kitle\`](https://discord.gg/${invite.code})
・ Ses kanalının [\`kilit kaldır\`](https://discord.gg/${invite.code})
・ Ses kanalını [\`görünmez yap\`](https://discord.gg/${invite.code})
・ Ses kanalını [\`görünür yap\`](https://discord.gg/${invite.code})
・ <@${modal.user.id}>'den kanal [\`sahipliğini iste\`](https://discord.gg/${invite.code})
・ Ses kanalına [\`üye(lere) giriş izni ver\`](https://discord.gg/${invite.code})
・ Ses kanalına giriş izni olan [\`üye(leri) çıkar\`](https://discord.gg/${invite.code})
・ Ses kanalını [\`yeniden düzenle\`](https://discord.gg/${invite.code})
・ Ses kanal [\`sahipliğini aktar\`](https://discord.gg/${invite.code})
・ Ses kanalını [\`kaldır\`](https://discord.gg/${invite.code})
`)
.setFooter({ text: modal.user.tag, iconURL: modal.user.displayAvatarURL({ dynamic: true }) })

if (!modal.replied) modal.reply({ content: `<@${modal.user.id}> size **Özel Odanız** başarıyla oluşturuldu.\n\nhttps://discord.gg/${invite.code}`, ephemeral: true });
client.channels.cache.get(c.id).send({ content: `<@${modal.user.id}>`, embeds: [embed], components: [row2,row3]})
})
    } else if (modal.customId === "edit2") {
        const room = await datas.findOne({ Owner: modal.user.id });
        const name = modal.fields.getTextInputValue("name");
        const limit = modal.fields.getTextInputValue("limit");
        if (isNaN(limit)) return;

        modal.reply({ content: `✏️ <@${modal.user.id}> Odanız başarılı bir şekilde yeniden düzenlendi.\n
\` ➥ \` Oda İsmi: ${name}
\` ➥ \` Oda Limiti: ${limit}
`, ephemeral: true })
        
        if (Guild?.channels?.cache.get(room?.ID) && Guild?.channels?.cache.get(room?.ID)?.manageable) {
            if (name !== (room?.Name)){
                await datas.findOneAndUpdate({Owner: modal.user.id}, {$set:{Name: name}}, {upsert: true});
                await Guild?.channels?.cache.get(room?.ID)?.setName(name, "Oda sahibi, oda ismini değiştirdi.");
            } 
            if (limit !== (room?.Limit)){
                await datas.findOneAndUpdate({Owner: modal.user.id}, {$set:{MaxUser: limit > 99 ? 99 : limit}}, {upsert: true});
                await Guild?.channels?.cache.get(room?.ID)?.setUserLimit(limit, "Oda sahibi, oda limitini değiştirdi.");
            } 
        }
    }
})

client.on("voiceStateUpdate", async (oldState, newState) => {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if (!oldState.channelId && newState.channelId) {
        await datas.findOneAndUpdate({ ID: newState.channelId}, {$set: {LastJoin: Date.now()}}, {upsert: true});
        await datas2.findOneAndUpdate({User: newState.id}, {$set: {Duration: Date.now()}}, {upsert: true});
    }

    let Data = await datas2.findOne({User: newState.id});
    if (!Data) await datas2.findOneAndUpdate({User: newState.id}, {$set: {Duration: Date.now()}}, {upsert: true});
    Data = await datas2.findOne({User: newState.id});
    const duration = Date.now() - Data.Duration;

    const moment = require("moment");
    require("moment-duration-format");
    moment.locale("tr");

    if (oldState.channelId && !newState.channelId) {
        const Room = await datas.findOne({ ID: oldState.channelId});
        if (Room) await datas.findOneAndUpdate({ ID: oldState.channelId}, {$inc: {Duration: duration}}, {upsert: true});
    } else if (oldState.channelId && newState.channelId) {
        const Room = await datas.findOne({ ID: oldState.channelId});
        if (Room) await datas.findOneAndUpdate({ ID: oldState.channelId}, {$inc: {Duration: duration}}, {upsert: true});
    };
});

client.on("channelDelete", async (channel) => {
let logs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelDelete });
let entry = logs.entries.first();
if (!entry || entry.executor.bot) return;
const data = await datas.findOne({ ID: channel.id })
if (!data) return;
await datas.deleteMany({ Owner: data.Owner });
});

client.on("ready", async () => {
    const sunucu = client.guilds.cache.get(allah.GuildID);
    const yarak = conf.secretroomParent;
    setInterval(async () => {
        const SecretRooms = (await datas.find({}) || [])?.filter((c) => sunucu.channels.cache.get(c.ID) && yarak == sunucu.channels.cache.get(c.ID)?.parentId && (sunucu.channels.cache.get(c.ID)?.members?.size ?? 0) == 0);
        for (let c of SecretRooms) {
            await datas.deleteMany({ ID: c.ID });
            if (sunucu.channels.cache.get(c.ID) && sunucu.channels.cache.get(c.ID)?.deletable) sunucu.channels.cache.get(c.ID)?.delete("10 dakika girilmediği için özel oda silindi.");
        }
    }, 1000 * 60 * 10)
});