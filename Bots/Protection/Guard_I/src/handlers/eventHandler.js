const fs = require("fs");
const client = global.bot;

  let dirs = fs.readdirSync('./src/events', { encoding: "utf8" });
  dirs.forEach(dir => {
      let files = fs.readdirSync(`./src/events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
      files.forEach(file => {
        let prop = require(`../events/${dir}/${file}`);
        client.on(prop.conf.name, prop);
        console.log(`[papaz EVENT] ${prop.conf.name} eventi yüklendi!`);
      });
  });