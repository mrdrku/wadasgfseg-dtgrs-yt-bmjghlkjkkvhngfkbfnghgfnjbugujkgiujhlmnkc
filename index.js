const express = require("express");
const app = express();

app.listen(() => console.log("I'm Ready To Work..!"));
app.get("/", (req, res) => {
  res.send(`
  <body>
  <center><h1>Logs Project<h1><p>Made by : ' Saleh ⚘♫ , Edit / Updated Code by Euiz <span style="animation: rainbow 3s ease-in-out infinite;"">24/7 Bot</span></p>
  <style>
  @keyframes rainbow {
    0% {
      color: red;
    }
    25% {
      color: orange;
    }
    50% {
      color: yellow;
    }
    75% {
      color: green;
    }
    100% {
      color: blue;
    }
  }
</style>
  </body>`);
});

const Discord = require("discord.js");

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
const prefix = "!";
const db = require("pro.db");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("online");
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "settings")) {
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`Messages Log`)
        .setCustomId(`msg`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`Members Log`)
        .setCustomId(`mem`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`Bans Log`)
        .setCustomId(`ban`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`Channels Log`)
        .setCustomId(`ch`)
        .setStyle(`SECONDARY`),
      new Discord.MessageButton()
        .setLabel(`Roles Log`)
        .setCustomId(`role`)
        .setStyle(`SECONDARY`),
    );
    let embed = new Discord.MessageEmbed()
      .setAuthor({
        name: `${message.member.user.username}`,
        iconURL: `${message.member.user.displayAvatarURL()}`,
      })
      .setTitle(`Setup Your Logs !`)
      .setDescription(
        `> **Choose The Log You Need And Choose The Channel For It**`,
      )
      .setThumbnail(`${message.guild.iconURL()}`)
      .setTimestamp()
      .setFooter({
        text: `${message.guild.name}`,
        iconURL: `${message.guild.iconURL()}`,
      });
    message.reply({ embeds: [embed], components: [row] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId == "msg") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("select1")
        .setPlaceholder("Select The Log Of Messages"),
    );
    interaction.guild.channels.cache.first(24).forEach((channel) => {
      if (channel.isText()) {
        row.components[0].addOptions([
          {
            label: `${channel.name}`,
            description: `-`,
            value: `${channel.id}`,
          },
        ]);
      }
    });
    interaction.update({ components: [row] });
  }
  if (interaction.customId == "mem") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("select5")
        .setPlaceholder("Select The Log Of Members"),
    );
    interaction.guild.channels.cache.first(24).forEach((channel) => {
      if (channel.isText()) {
        row.components[0].addOptions([
          {
            label: `${channel.name}`,
            description: `-`,
            value: `${channel.id}`,
          },
        ]);
      }
    });
    interaction.update({ components: [row] });
  }
  if (interaction.customId == "ban") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("select2")
        .setPlaceholder("Select The Log Of Bans & Kicks"),
    );
    interaction.guild.channels.cache.first(24).forEach((channel) => {
      if (channel.isText()) {
        row.components[0].addOptions([
          {
            label: `${channel.name}`,
            description: `-`,
            value: `${channel.id}`,
          },
        ]);
      }
    });
    interaction.update({ components: [row] });
  }
  if (interaction.customId == "ch") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("select3")
        .setPlaceholder("Select The Log Of Channels"),
    );
    interaction.guild.channels.cache.first(24).forEach((channel) => {
      if (channel.isText()) {
        row.components[0].addOptions([
          {
            label: `${channel.name}`,
            description: `-`,
            value: `${channel.id}`,
          },
        ]);
      }
    });
    interaction.update({ components: [row] });
  }
  if (interaction.customId == "role") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("select4")
        .setPlaceholder("Select The Log Of Roles"),
    );
    interaction.guild.channels.cache.first(24).forEach((channel) => {
      if (channel.isText()) {
        row.components[0].addOptions([
          {
            label: `${channel.name}`,
            description: `-`,
            value: `${channel.id}`,
          },
        ]);
      }
    });
    interaction.update({ components: [row] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "select1") {
      interaction.update({
        embeds: [],
        components: [],
        content: `**Done The Log Of Messages Is : <#${interaction.values[0]}> !**`,
      });
      db.set(`msgchannel_${interaction.guild.id}`, interaction.values[0]);
    }
    if (interaction.customId == "select5") {
      interaction.update({
        embeds: [],
        components: [],
        content: `**Done The Log Of Members Is : <#${interaction.values[0]}> !**`,
      });
      db.set(`memberschannel_${interaction.guild.id}`, interaction.values[0]);
    }
    if (interaction.customId == "select2") {
      interaction.update({
        embeds: [],
        components: [],
        content: `**Done The Log Of Bans & Kicks Is : <#${interaction.values[0]}> !**`,
      });
      db.set(`banchannel_${interaction.guild.id}`, interaction.values[0]);
    }
    if (interaction.customId == "select3") {
      interaction.update({
        embeds: [],
        components: [],
        content: `**Done The Log Of Channels Is : <#${interaction.values[0]}> !**`,
      });
      db.set(`channelslog_${interaction.guild.id}`, interaction.values[0]);
    }
    if (interaction.customId == "select4") {
      interaction.update({
        embeds: [],
        components: [],
        content: `**Done The Log Of Roles Is : <#${interaction.values[0]}> !**`,
      });
      db.set(`rolechannel_${interaction.guild.id}`, interaction.values[0]);
    }
  }
});

//////////////////////////////////////////////////////

client.on("messageDelete", async (message) => {
  let ch = db.get(`msgchannel_${message.guild.id}`);
  if (ch) {
    let channel = message.guild.channels.cache.find((r) => r.id == ch);
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: "MESSAGE_DELETE",
    });

    const deletionLog = fetchedLogs.entries.first();

    const { executor, target } = deletionLog;

    const embed = new Discord.MessageEmbed()
      .setTitle("New Message Deleted !")
      .setDescription(
        `> **Message : ${message.content}**\n> **Sent By : <@${message.member.id}>**\n> **Deleted By : ${executor}**\n> **In : ${message.channel}**`,
      )
      .setAuthor({
        name: `${message.member.user.username}`,
        iconURL: `${message.member.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${message.guild.name}`,
        iconURL: `${message.guild.iconURL()}`,
      })
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  let ch = db.get(`msgchannel_${oldMessage.guild.id}`);
  if (ch) {
    let channel = oldMessage.guild.channels.cache.find((r) => r.id == ch);
    const embed = new Discord.MessageEmbed()
      .setTitle("New Message Edited !")
      .setDescription(
        `> **Sent By : <@${oldMessage.member.id}> In : ${oldMessage.channel} [Message Link](${oldMessage.url})**\n\n> **Old Message :**\n\`\`\`${oldMessage.content}\`\`\`\n> **New Message :**\n\`\`\`${newMessage.content}\`\`\``,
      )
      .setAuthor({
        name: `${oldMessage.member.user.username}`,
        iconURL: `${oldMessage.member.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${oldMessage.guild.name}`,
        iconURL: `${oldMessage.guild.iconURL()}`,
      })
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

//////////////////////////////////////////////////////

client.on("guildMemberAdd", (member) => {
  let ch = db.get(`memberschannel_${member.guild.id}`);
  if (ch) {
    let channel = member.guild.channels.cache.find((r) => r.id == ch);
    const embed = new Discord.MessageEmbed()
      .setTitle("New Member Joined !")
      .setDescription(`${member} **Joined The Server **`)
      .setAuthor({
        name: `${member.user.username}`,
        iconURL: `${member.user.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${member.guild.name}`,
        iconURL: `${member.guild.iconURL()}`,
      })
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

client.on("guildMemberRemove", (member) => {
  let ch = db.get(`memberschannel_${member.guild.id}`);
  if (ch) {
    let channel = member.guild.channels.cache.find((r) => r.id == ch);
    const embed = new Discord.MessageEmbed()
      .setTitle("Member Left !")
      .setDescription(`${member} **Left The Server **`)
      .setAuthor({
        name: `${member.user.username}`,
        iconURL: `${member.user.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${member.guild.name}`,
        iconURL: `${member.guild.iconURL()}`,
      })
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

//////////////////////////////////////////////////////

client.on("guildMemberRemove", async (member) => {
  let ch = db.get(`kickchannel_${member.guild.id}`);
  if (ch) {
    let channel = member.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_KICK",
    });

    const kickLog = fetchedLogs.entries.first();
    const { executor, target } = kickLog;

    // if (target.id === member.id) {
    const embed = new Discord.MessageEmbed()
      .setTitle("New Member Kicked !")
      .setDescription(
        `> **Member : ${member.user}**\n> **Kicked By : ${executor}**`,
      )
      .setAuthor({
        name: `${member.user.username}`,
        iconURL: `${member.user.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
    // }
  }
});

client.on("guildBanAdd", async (ban) => {
  let ch = db.get(`banchannel_${ban.guild.id}`);
  if (ch) {
    let channel = ban.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_ADD",
    });

    const banLog = fetchedLogs.entries.first();

    const { executor, target } = banLog;

    if (target.id === ban.user.id) {
      const embed = new Discord.MessageEmbed()
        .setTitle("New Member Banned ✈ !")
        .setDescription(
          `> **Member : ${ban.user}**\n> **Banned By : ${executor}**`,
        )
        .setAuthor({
          name: `${ban.user.username}`,
          iconURL: `${ban.user.displayAvatarURL()}`,
        })
        .setFooter({
          text: `${executor.username}`,
          iconURL: `${executor.displayAvatarURL()}`,
        })
        .setThumbnail(`${ban.user.displayAvatarURL()}`)
        .setTimestamp();
      channel.send({ embeds: [embed] });
    }
  }
});

client.on("guildBanRemove", async (ban) => {
  let ch = db.get(`banchannel_${ban.guild.id}`);
  if (ch) {
    let channel = ban.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_BAN_REMOVE",
    });

    const banLog = fetchedLogs.entries.first();

    const { executor, target } = banLog;

    if (target.id === ban.user.id) {
      const embed = new Discord.MessageEmbed()
        .setTitle("New Member Unbanned !")
        .setDescription(
          `> **Member : ${ban.user}**\n> **Unbanned By : ${executor}**`,
        )
        .setAuthor({
          name: `${ban.user.username}`,
          iconURL: `${ban.user.displayAvatarURL()}`,
        })
        .setFooter({
          text: `${executor.username}`,
          iconURL: `${executor.displayAvatarURL()}`,
        })
        .setThumbnail(`${ban.user.displayAvatarURL()}`)
        .setTimestamp();
      channel.send({ embeds: [embed] });
    }
  }
});

//////////////////////////////////////////////////////

client.on("channelCreate", async (channel) => {
  let ch = db.get(`channelslog_${channel.guild.id}`);
  if (ch) {
    let channel2 = channel.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_CREATE",
    });

    const channellog = fetchedLogs.entries.first();

    const { executor, target } = channellog;

    const embed = new Discord.MessageEmbed()
      .setTitle("New Channel Created !")
      .setDescription(
        `> **Channel Created By : ${executor}**\n> **Channel Name : \`${channel.name}\`**`,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${channel.guild.name}`,
        iconURL: `${channel.guild.iconURL()}`,
      })
      .setThumbnail(`${channel.guild.iconURL()}`)
      .setTimestamp();
    channel2.send({ embeds: [embed] });
  }
});

client.on("channelDelete", async (channel) => {
  let ch = db.get(`channelslog_${channel.guild.id}`);
  if (ch) {
    let channel2 = channel.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_DELETE",
    });

    const channellog = fetchedLogs.entries.first();

    const { executor, target } = channellog;

    const embed = new Discord.MessageEmbed()
      .setTitle("New Channel Deleted !")
      .setDescription(
        `> **Channel Deleted By : ${executor}**\n> **Channel Name : \`${channel.name}\`**`,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${channel.guild.name}`,
        iconURL: `${channel.guild.iconURL()}`,
      })
      .setThumbnail(`${channel.guild.iconURL()}`)
      .setTimestamp();
    channel2.send({ embeds: [embed] });
  }
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  let ch = db.get(`channelslog_${oldChannel.guild.id}`);
  if (ch) {
    let channel = oldChannel.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await oldChannel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_UPTADE",
    });

    const channellog = fetchedLogs.entries.first();

    const { executor, target } = channellog;

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Uptaded !")
      .setDescription(
        `> **Channel Uptaded By : ${executor}**\n\n> **Old Channel Name :**\n\`\`\`${oldChannel.name}\`\`\`\n> **New Channel Name :**\n\`\`\`${newChannel.name}\`\`\``,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${oldChannel.guild.name}`,
        iconURL: `${oldChannel.guild.iconURL()}`,
      })
      .setThumbnail(`${oldChannel.guild.iconURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

//////////////////////////////////////////////////////

client.on("roleCreate", async (role) => {
  let ch = db.get(`rolechannel_${role.guild.id}`);
  if (ch) {
    let channel = role.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_CREATE",
    });

    const rolelog = fetchedLogs.entries.first();

    const { executor, target } = rolelog;

    const embed = new Discord.MessageEmbed()
      .setTitle("New Role Created !")
      .setDescription(
        `> **Role Created By : ${executor}**\n> **Role Name : \`${role.name}\`**`,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${role.guild.name}`,
        iconURL: `${role.guild.iconURL()}`,
      })
      .setThumbnail(`${role.guild.iconURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

client.on("roleUpdate", async (oldRole, newRole) => {
  let ch = db.get(`rolechannel_${oldRole.guild.id}`);
  if (ch) {
    let channel = oldRole.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await oldRole.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_UPTADE",
    });

    const rolelog = fetchedLogs.entries.first();

    const { executor, target } = rolelog;

    const perms = newRole.permissions
      .toArray()
      .map((e) => {
        const words = e.split("_").map((x) => x[0] + x.slice(1).toLowerCase());
        return words.join(" ");
      })
      .join("\n");

    const embed = new Discord.MessageEmbed()
      .setTitle("Role Uptaded !")
      .setDescription(
        `> **Role Uptaded By : ${executor}**\n\n> **Old Role Name :**\n\`\`\`${oldRole.name}\`\`\`\n> **New Role Name :**\n\`\`\`${newRole.name}\`\`\`\n> **New Role Color : ${newRole.color}**\n> **New Role Permissions :**\n\`\`\`${perms}\`\`\``,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${oldRole.guild.name}`,
        iconURL: `${oldRole.guild.iconURL()}`,
      })
      .setThumbnail(`${oldRole.guild.iconURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

client.on("roleDelete", async (role) => {
  let ch = db.get(`rolechannel_${role.guild.id}`);
  if (ch) {
    let channel = role.guild.channels.cache.find((r) => r.id == ch);

    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: "ROLE_DELETE",
    });

    const rolelog = fetchedLogs.entries.first();

    const { executor, target } = rolelog;

    const embed = new Discord.MessageEmbed()
      .setTitle("New Role Deleted !")
      .setDescription(
        `> **Role Deleted By : ${executor}**\n> **Role Name : \`${role.name}\`**`,
      )
      .setAuthor({
        name: `${executor.username}`,
        iconURL: `${executor.displayAvatarURL()}`,
      })
      .setFooter({
        text: `${role.guild.name}`,
        iconURL: `${role.guild.iconURL()}`,
      })
      .setThumbnail(`${role.guild.iconURL()}`)
      .setTimestamp();
    channel.send({ embeds: [embed] });
  }
});

client.login(process.env.token);
//قم بـانشاء ملف database.json
//واضع فيه علامتي
// {}
