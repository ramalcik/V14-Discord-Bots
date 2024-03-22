const { Client,  VoiceChannel, GuildMember, PermissionFlagsBits, GatewayIntentBits, Partials } = require('discord.js');
const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus, joinVoiceChannel, } = require('@discordjs/voice');
const play = require('play-dl');
const conf = require('./../Executive/src/configs/sunucuayar.json');
const allah = require('./../../config.json');
const { Model } = require('mongoose');

class papaz extends Client {
    constructor(options) {
        super({
            options,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildIntegrations
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.User,

            ]
        })

        this.player = createAudioPlayer({
            inlineVolume : true,
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });
        this.stream;
        this.message;
        this.channelId;
        this.playing;
        this.voiceConnection;
        this.staffJoined = false;
    
        this.on("guildUnavailable", async (guild) => {  })
        .on("disconnect", () => {})
        .on("reconnecting", () => {})
        .on("error", (e) => console.log(e))
        .on("warn", (info) => console.log(info));

        process.on("unhandledRejection", (err) => { console.log(err) });
        process.on("warning", (warn) => { console.log(warn) });
        process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
        process.on("uncaughtException", err => {
            const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                console.error("Beklenmedik Hata: ", hata);
               // process.exit(1);
        });


    }

    async _start(channelId, a) {
        const Database = require("./WelcomeMode"); 

        let guild = this.guilds.cache.get(allah.GuildID);
        if(!guild) return;
        let channel = guild.channels.cache.get(channelId);
        if(!channel) return;

        const data = await Database.findOne({ guildID: allah.GuildID });
        let Mode = data && data.SesMod ? data.SesMod : "./src/sesler/hosgeldin.mp3"
        let Staff = data && data.YetkiliSesMod ? data.YetkiliSesMod : "./src/sesler/yetkili.mp3"
    
        this.channelId = channelId;
        let connection = this.voiceConnection 
        let resource;
        resource = this.stream = createAudioResource(Mode); 
    
        let player = this.player
        
        player.on(AudioPlayerStatus.Playing, () => {
       
        });
        player.on(AudioPlayerStatus.Paused, () => {
            
        });
        player.on('idle', async () => {
        if(this.staffJoined == true) return;    
        resource = this.stream = createAudioResource(Mode);              
        this.player.play(resource);
        });
        if(this.staffJoined == true) return;
        player.play(resource)
        connection.subscribe(player);
    }
}

module.exports = { papaz };

VoiceChannel.prototype.hasStaff = function(checkMember = false) {
    if(this.members.some(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get('1193998940094341160').position)) return true;
    return false;
}

VoiceChannel.prototype.getStaffs = function(checkMember = false) {
    return this.members.filter(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get('1193998940094341160').position).size
}

GuildMember.prototype.isStaff = function() {
    if(
        !this.user.bot &&
        (
            this.permissions.has(PermissionFlagsBits.Administrator) ||
           this.roles.highest.position >= this.guild.roles.cache.get(conf.teyitciRolleri[0]).position
        )
    ) return true;
    return false;
}