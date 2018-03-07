const Discord = require('discord.js');
const fs = require("fs");
const config = require("./config.json");
const weather = require('weather-js');
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log("I Am Ready!");
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('ready', () => {
  console.log(`[Start] ${new Date()}`);
});

bot.on('guildMemberAdd', function(member) {
	member.guild.channels.find("name", "welcome").sendMessage(`**Welcome, ${member} To  ${member.guild.name}!**`);
  member.addRole(member.guild.roles.find("name", "Newbie"));
})

bot.on('guildMemberRemove', function(member) {
	member.guild.channels.find("name", "welcome").sendMessage(`**See You Later Buddy, ${member} Left ${member.guild.name}!**`);
})

// Announce COMMAND
bot.on('message', message => {
  if(message.content.split(' ')[0] == '!sm')
      message.guild.members.forEach(member => {
          if(!message.member.hasPermission("ADMINISTRATOR")) return;
          member.send(`${member} ! ` + "**" + message.guild.name + " : ** " + message.content.substr(3));
          message.delete();
      });

  var prefix = "!";
  var args = message.content.substring(prefix.length).split(" ");
  if(message.content.startsWith(prefix + "sm")) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      if(!args[1]) {
          let embed3 = new Discord.RichEmbed()
              .setDescription(":white_check_mark: | Message Has Been Sent Empty")
              .setColor("#FF0000")
          message.channel.sendEmbed(embed3);
      } else {
          let embed4 = new Discord.RichEmbed()
              .setDescription(':white_check_mark: | Message Has Been Sent Successfully')
              .setColor("#008000")
          message.channel.sendEmbed(embed4);
          message.delete();
      }
    }

    if(message.content === "!roles") {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        .addField('Roles:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }

    if(message.content.startsWith(prefix + "uptime")) {
		var days = Math.floor(bot.uptime / 86400000000000)
		var hours = Math.floor(bot.uptime / 3600000)
		var minutes = Math.floor((bot.uptime % 3600000) / 60000)
		var seconds = Math.floor(((bot.uptime % 360000) % 60000) / 1000)
		const embed = new Discord.RichEmbed()
		.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
		.addField('**Uptime**', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
		message.channel.send(embed)
    }

    if(message.content.startsWith(prefix + 'tf')) {

        let randnum_game = Math.floor(Math.random() * 2)
    
        if (randnum_game == 0) {
    
            const embed = new Discord.RichEmbed()
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
            .setDescription(" :white_check_mark: **True**")
            .setFooter('True Or False Game')
            message.channel.send({embed}).catch(console.error)
    
        }else if(randnum_game == 1) {
    
            const embed = new Discord.RichEmbed()
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
            .setDescription(" :negative_squared_cross_mark: **False**")
            .setFooter('True Or False Game')
            message.channel.send({embed}).catch(console.error)
        }
    }

    if(message.content === "!serverinfo") {
        const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        .setThumbnail('https://media.discordapp.net/attachments/413313279268487170/413326734436597780/photo.jpg?width=216&height=216')
        .setDescription("`Server Information`")
        .addField("**Owner:**", message.guild.owner)
        .addField("**Server Name:**", message.guild.name)
        .addField("**Server ID:**", message.guild.id)
        .addField("**Total Members:**", message.guild.memberCount)
        .addField("**Region:**", message.guild.region)
        .addField("**Verification Level:**", message.guild.verificationLevel)
        .addField("**Date created:**", message.guild.createdAt)
        .addField("**Roles:**", 'To See A List With All Roles Use *!roles*')
        message.channel.send({embed});
    }

    if(message.content.startsWith(prefix + 'roleinfo')) {
    if (!message.mentions.roles.first()) {message.channel.send("**Please Mention A Role!**")} else {
        let role = message.mentions.roles.first();
            const embed = new Discord.RichEmbed() // let the message embed be a new RichEmbed
            .setDescription("`Role Information`")
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
            .setTitle("Role: "+role.name) // set the title to "Role: <Role name here>"
            .addField("Created At:", role.createdAt)
            .addField("Managed:", role.managed, true)
            .addField("Hoisted:", role.hoist, true)
            .addField("Position:", role.position, true)
            .addField("Editable:", role.editable, true)
            .addField("Mentionable:", role.mentionable, true)
            .addField("Color:", role.hexColor, true) // the "true" here means the field is inline, which means other inline fields can be placed after it
            .addField("Members:", role.members.size, true) // role.members is a collection, collections have the "size" property, meaning how many elements are in this collection
            .addField("Permission BitField:", role.permissions) // doing what the other bot did here is a bit different, it probably checked through all permission flags and checked if the role has them, then added them to an array and joined it here to a string
            .setFooter(`Role ID: ${role.id}`)
            message.channel.send({embed});
        }
    }

    if(message.content.startsWith(prefix + "myid")) {
		message.reply(`Your ID Is: **${message.author.id}**`)
    }

    if(message.content === prefix + "help") {
        let embed = new Discord.RichEmbed()
        .setTitle('**General Command\'s:**')
        .setDescription('```prefix: Tells You the Prefix Of The Bot```')
        .addField("**!userinfo:**", " Shows A Account Information.")
        .addField("**!serverinfo:**", " Shows Server Information.")
        .addField("**!channelinfo:**", " Shows Channel Information That You Are In.")
        .addField("**!roleinfo:**", " Shows Role Information.")
        .addField("**!roles:**", " Shows All Roles At The Server.")
        .addField("**!ping:**", " Shows How Fast Is The Bot.")
        .addField("**!avatar:**", " Shows Someones Avatar In Big Size.")
        .addField("**!uptime:**", " To See How Long The Bot Was Awake.")
        .addField("**!myid:**", " To See Your ID.")
        .addField("**!vote:**", "Votes On A Specific Message.")
        .addField("**!sm:**", "Announce Send A Private Message To All The Guild.")
        .addField("**!purge:**", "Clears A Specific Amount Of Messages 1-100.")
        .addField("**!insta:**", "Shows Last Picture From Instagram Of Someones Profile.")
        .addField("**!ftn:**", "Shows You Your Fortnite Stats (PC ONLY).")
        .addField("**!say:**", "Talks With The Bot.")
        .addField("**!poll:**", "Ask A Question To The Members.")
        .addField("**!choice:**", "Choose The Best Choice.")
        .addField("**!mute:**", "Mutes The Mention Person.")
        .addField("**!unmute:**", "Unmutes The Mention Person.")
        .addField("**!embed:**", "Quotes The Message You Write.")
        .addField("**!link:**", "Shows The Link To Invite The Bot.")
        .addField("**!mhelp**", "For Music Commands.")
        .addField("**!fhelp**", "For Fun Commands.")
        .addField("Join Our Server", "(https://discord.gg/a5UkMa2)") 
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        message.channel.sendEmbed(embed);
        
      }

      if(message.content === prefix + "fhelp") {
        let embed = new Discord.RichEmbed()
        .setTitle('**Fun Command\'s:**')
        .setDescription('```prefix: Tells You the Prefix Of The Bot```')
        .addField("**!tf:**", "True and false.")
        .addField("**!rps:**", "Rock Paper Scissor.")
        .addField("**!rng:**", "Roll From 1-999.")
        .addField("**!kms:**", "Kill yourself.")
        .addField("**!bingo:**", "Plays Bingo.")
        .addField("**!crash:**", "Trying to crash the bot.")
        .addField("**!8ball:**", "Ask the Magical 8ball.")
        .addField("**!flipcoin:**", "Flips a coin.")
        .addField("**!shrug:**", "Shrug Face.")
        .addField("**!unflip:**", "Unflips the table.")
        .addField("**!tableflip:**", "Flips the table.")
        .addField("**!doubleflip:**", "Double flips the table.")
        .addField("**!mhelp**", "For Music Commands.")
        .addField("**!help**", "For General Commands.")
        .addField("Join Our Server", "(https://discord.gg/a5UkMa2)") 
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        message.channel.sendEmbed(embed);
        
      }


        if (message.content === "!shrug") { 
            message.delete();
            message.reply(" : ¯\\_(ツ)_/¯"); 
        }
        if (message.content === "!tableflip") { 
            message.delete();
            message.reply(" : (╯°□°）╯︵ ┻━┻"); 
        }
        if (message.content === "!unflip") { 
            message.delete();
            message.reply(" : ┬─┬ ノ( ゜-゜ノ)"); 
        }
        if (message.content === "!doubleflip") { 
            message.delete();
            message.reply("┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
        }
    
    if(message.content === "prefix")  {
        message.reply('**The Prefix Is: !**');
        }

        const swearWords = ["fuck","bitch","cunt","faggot","kos omk","hoe","hoes","motherfucker","dick","pussy","ass","gay","sex","porn","blowjob","lesbian","masterbate","fapping","asshole","boobs","shemale","horny","nigger","wank","pussy","cock"];
        var msg = message.content.toLowerCase();
        if(swearWords.some(word => msg.includes(word)) || swearWords.some(word => message.content.includes(word))) {
          message.delete();
          message.reply("**You Shouldn't Have Said That!**");
        }

        var choices = [];

        if (message.content.split(' ')[0] == prefix + "choice") {
            tempcnt = message.content.replace(prefix + "choice", "")
            choices = tempcnt.split(',')
    
    
            var choice = choices[Math.floor(Math.random() * choices.length)];
    
            if (choice) {
                message.reply("**I think `" + choice + "`would be the best choice!**")
            }
            choices = []
            tempcnt = undefined
            return
        }
});


// For The Music.
const Music = require('discord.js-musicbot-addon');
const music = new Music(bot, {
    prefix: "!",
    maxQueueSize: "100",
    disableLoop: true,
    thumbnailType: 'high',
    leaveHelp: "To leave the voice channel.",
    leaveAlt: ["left","kick","go out"],
    helpCmd: 'mhelp',
    playCmd: 'play',
    volumeCmd: 'volume',
    leaveCmd: 'leave',
    ownerOverMember: true,
    botOwner: 'OWNER ID HERE', // YOUR ACCOUNT ID HERE, YOU CAN GET IT BY RIGHT CLICKING ON YOUR ACCOUNT
    youtubeKey: 'AIzaSyAAbLrvqq6kOeGVxEHusBxjo5-Xnr603jI'
});

bot.on("msg", msg => {
    if(message.content.startsWith(prefix + "roleinfo")) {
	let nb = msg.content.split(" ").slice(1).length;
	let role = msg.member.highestRole;
	if (nb > 0)
		role = tools.stringToRoles(msg.content.replace(config.prefix + "roleinfo ", ""), msg.guild).shift();
	if (role === undefined)
		msg.channel.send("This role doesn't exist.");
	else
        msg.channel.send("", funcs.showRoleInfo(role));
    }
});

bot.on("message", message => {
    if(message.content === "!NA")  {
        message.member.addRole('419857900735954954')
    }
});

bot.on("message", message => {
    if(message.content === "!na")  {
        message.member.addRole('419857900735954954')
    }
});

bot.on("message", message => {
    if(message.content === "!EU")  {
        message.member.addRole('419857898781409280')
    }
});

bot.on("message", message => {
    if(message.content === "!eu")  {
        message.member.addRole('419857898781409280')
    }
});


bot.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
  } catch (err) {
    console.error();
  }
});

var anti_spam = require("discord-anti-spam");
 
anti_spam(bot, {
  warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned. 
  maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned. 
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned. 
  warningMessage: "stop spamming or I'll whack your head off.", // Warning message send to the user indicating they are going to fast. 
  banMessage: "has been banned for spamming, anyone else?", // Ban message, always tags the banned user in front of it. 
});

bot.on('message', message => {
    
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.split(' ')[0].slice(config.prefix.length);
    if (command === 'ping') {
      message.channel.send('Pinging...').then(msg => {
        msg.edit(`**Response took:** \`(${msg.createdTimestamp - message.createdTimestamp}ms)\``);
      });
    };

});

process.on("unhandledRejection", console.error);

bot.login(config.token);