let allah = require('./config.json');

let botcuk = [
      {
        name: `${allah.GuildName}_Moderation`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Executive/Distributors"
      },
      {
        name: `${allah.GuildName}_Voucher`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Executive/Voucher"
      },
      {
        name: `${allah.GuildName}_Statistics`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Executive/Statistics"
      },
      {
        name: `${allah.GuildName}_Guard`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Protection/Guard_I"
      },
      {
        name: `${allah.GuildName}_Guard`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Protection/Guard_II"
      },
      {
        name: `${allah.GuildName}_Guard`,
        namespace: `${allah.GuildName}`,
        script: 'papaz.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "1G",
        cwd: "./Bots/Protection/Guard_III"
      },

    ]


  module.exports = {
    apps: botcuk
  };