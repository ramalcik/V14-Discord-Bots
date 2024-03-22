const { Client, Partials } = require("discord.js");
const allah = require("../../../config.json");
const client = (global.bot = new Client({ 
    fetchAllMembers: true, 
    intents: [ 3276799 ],
    partials: [
      Partials.User, 
      Partials.Channel, 
      Partials.GuildMember,
      Partials.Message,
      Partials.Reaction,
      Partials.GuildScheduledEvent,
      Partials.ThreadMember
    ], }));

client
.login(allah.Guard.Token.Guard_I)
.then(() => console.log("Bot Başarıyla Bağlandı!"))
.catch(() => console.log("[HATA] Bot Bağlanamadı!"));
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
});
  
process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
});