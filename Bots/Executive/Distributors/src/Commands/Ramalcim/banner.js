  const { ApplicationCommandOptionType, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
  const axios = require('axios');
  const { DiscordBanners } = require('discord-banners');
  const fetch = require('node-fetch')
  const client = global.bot;
  const ayar = require("../../../../src/configs/ayarName.json");

  module.exports = {
    conf: {
      aliases: ["banner","bannercik"],
      name: "banner",
      help: "banner <papaz/ID>",
      category: "kullanıcı",
    },

  run: async (client, message, args, embed, prefix) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));  

    const member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
    const discordBanners = new DiscordBanners(client);
    const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
    if(banner){   
    let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda Aç", style:ButtonStyle.Link, url: banner})]})
    await message.reply({ embeds: [ new EmbedBuilder().setColor("#2b2d31").setImage(`${banner}`)] , components:[Link] })}
      },

    };