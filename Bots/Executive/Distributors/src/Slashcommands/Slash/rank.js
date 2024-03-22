const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication } = require("discord.js");
const ramalcim = require("../../../../../../config.json")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Yetki Atlama Rank Sistemidir.")
  .addSubcommand((command) =>
      command
        .setName("ekle")
        .setDescription("Yetki Atlama Rankları eklemeye yarar.")
        .addIntegerOption((option) => option.setName("coin").setDescription("Rank'a ulaşacağı coin miktarı.").setRequired(true))
        .addRoleOption((option) => option.setName("roller").setDescription("Rank'a ulaştığında verilecek rol/roller.").setRequired(true))
  )
  .addSubcommand((command) =>
      command
        .setName("sil")
        .setDescription("Yetki Atlama Rankları silmeye yarar.")
        .addIntegerOption((option) => option.setName("coin").setDescription("Kaç coinde ulaşılan rank silinicekse coin miktarı.").setRequired(true))
  )
  .addSubcommand((command) => command.setName("temizle").setDescription("Tüm Rank Datasını temizlemek."))
  .addSubcommand((command) => command.setName("liste").setDescription("Tüm Rank Datasının Liste Görünümü")),


async execute(interaction, client) {
if(!ramalcim.owners.includes(interaction.user.id)) {
    return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
}
  const coin = interaction.options.getInteger("coin");
  if (interaction.options.getSubcommand() === "ekle") {
      if (!coin || isNaN(coin)) return interaction.reply({ content: "Eklenecek yetkinin coinini belirtmelisin!", ephemeral: true })
      if (client.ranks.some((x) => x.coin === coin)) return interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller zaten ayarlanmış!`, ephemeral: true })
      const roles = interaction ? [interaction.options.getRole("roller")] : [...message.mentions.roles.values()];
      if (!roles || !roles.length) return interaction.reply({ content: "Eklenecek yetkinin rol(leri) belirtmelisin!", ephemeral: true })
      client.ranks = global.rankdb.push("ranks", { role: roles.map((x) => x.id), coin: parseInt(coin) }).sort((a, b) => a.coin - b.coin);
      interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller ayarlandı! \nVerilecek Roller: ${roles.map((x) => `<@&${x.id}>`).join(", ")}`, ephemeral: true })
  } else if (interaction.options.getSubcommand() === "sil") {
      if (!coin || isNaN(coin)) return interaction.reply({ content: "Silinecek yetkinin coinini belirtmelisin!", ephemeral: true })
      if (!client.ranks.some((x) => x.coin === coin)) return interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller ayarlanmamış!`, ephemeral: true })
      client.ranks = global.rankdb
          .set(
              "ranks",
              client.ranks.filter((x) => x.coin !== coin)
          )
          .sort((a, b) => a.coin - b.coin);
          interaction.reply({ content: `${coin} coine ulaşıldığında verilecek roller silindi!`, ephemeral: true })
  } else if (interaction.options.getSubcommand() === "temizle") {
      if (!global.rankdb.get("ranks") || !global.rankdb.get("ranks").length) return interaction.reply({ content: "Rank sistemi tertemiz!", ephemeral: true })
      global.rankdb.set("ranks", []);
      interaction.reply({ content: "Tüm yetkiler başarıyla temizlendi!", ephemeral: true })
  } else if (interaction.options.getSubcommand() === "liste") {
      const ranks = global.rankdb.get("ranks");
      interaction.reply({
          embeds: [
              new EmbedBuilder()
              .setDescription(
                  ranks && ranks.length ? ranks
                    .sort((a, b) => b.coin - a.coin)
                    .map((x) => `${Array.isArray(x.role) ? `<@&${x.role}>` : `<@&${x.role}>`}: ${x.coin}`)
                    .join("\n") : "Rank ayarlanmamış!"
              )
          ]
          , ephemeral: true })
  }
}
};