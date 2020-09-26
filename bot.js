// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Prefix $ | We are on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Prefix $ | We are on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Prefix $ | Watching ${client.guilds.size} Servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
    if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Pinging..");
    m.edit(`${m.createdTimestamp - message.createdTimestamp}ms`);
  }
  
  if(command === "avatar") {
    message.channel.send(`${message.author.avatarURL}`);
  }

  if(command === "help") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle("Here Are The Commands")
    .setColor("00FFFF")
    .addField("$help", "Gives a list of commands.")
    .addField("$ping", "Shows latency between the bot and the API.")
    .addField("$dm", "Gives a small dm.")
    .addField("$avatar", "Shows a picture of your avatar.")
    .addField("$botinfo", "Displays information about the bot.")
    .addField("$serverinfo", "Displays information about the server.")
    .setFooter("Prefix: $ | This bot is still under construction");
    
    return message.channel.send(embed);
  }
  
  //message.author.avatarURL
    if(command === "dm") {
      message.member.send('Hello World!')
  }

  
    if(command === "botinfo") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle("BOT INFO")
    .setColor("00FFFF")
    .addField("Bot Name:", "Nix")
    .addField("Bot Author", "_Ghostt#5292")
    .addField(`Servers`, `${client.guilds.size}`)
    .setFooter("If there are any issues contact the author.");
    
    return message.channel.send(embed);
  }
  
    if(command === "serverinfo") {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle(`${message.guild}`)
    .setColor("00FFFF")
    .addField("OWNER:",message.guild.owner, true)
    .addField("ROLES:",message.guild.roles.size, true)
    .addField("REGION:",message.guild.region, true)
    .addField("MEMBERS:",message.guild.memberCount, true);
    
    return message.channel.send(embed);
    }
  
    if(command === "say") {
      if(message.author.id == 134812399994667009){
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
      } else{
          message.channel.send("Hey You Are Not The Bot Owner!")
      }
  }
    if(command === "oof") {
      if(message.author.id == 134812399994667009){
      var role= member.guild.roles.cache.find(role => role.name === "Ochinchin");
      message.author.roles.add(role);
      } else{
          message.channel.send("Hey You Are Not The Bot Owner!")
      }
  }
  
  if(command === "enablevip") {
    if(message.author.id == 134812399994667009){
    let embed = new Discord.RichEmbed()
    .setAuthor(`Nix`, client.user.avatarURL)
    .setTitle("(!)")
    .setColor("32CD32")
    .addField(`Success`,`${message.guild} Now Has Access To Vip Commands Issued By (BOT ADMIN: _Ghostt#5292)`);

    return message.channel.send(embed);
    } else{
        message.channel.send("Hey You Are Not The Bot Owner!")
    }
}
 
});

client.login(process.env.BOT_TOKEN);
