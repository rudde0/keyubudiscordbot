const Discord = require('discord.js');
const client = new Discord.Client();
//const activities = require('./assets/activities');
/*const fs = require("fs");
let ticketbans = JSON.parse(fs.readFileSync("./ticketbans.json", "utf8"));*/

client.on('ready', () => {
	console.log(`${client.user.tag} adiyla bot baslatildi. Kimlik: ${client.user.id}`);
	//client.setInterval(() => {
		//const activity = activities[Math.floor(Math.random() * activities.length)];
	client.user.setStatus('available')
	client.user.setPresence({
		game: {
			name: "keyubu.com sunucularında",
			type: "0"
		}
	});
    //}, 60000);
});
client.on('error', console.error);

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

client.on('message', message => {
	if (message.channel.id === '575702218016161828') {
		message.react('✅');
		message.react('❌');
	}
	if (message.content.toLowerCase().startsWith(`-destek`) || message.content.toLowerCase().startsWith(`-oluştur`) || message.content.toLowerCase().startsWith(`-olustur`) || message.content.toLowerCase().startsWith(`-new`)) {
		const reason = message.content.split(" ").slice(1).join(" ");
		if (!message.channel.name.startsWith(`🤖`)) return message.channel.send(`Sistem, sadece komut kanalında çalıştırılabilir.`);
		if (message.guild.channels.exists("name", "🎫" + message.author.username)) return message.channel.send(`Halihazırda açık bir ticketiniz var.`);
		message.guild.createChannel(`🎫${message.author.username}`, "text").then(c => {
			c.setTopic(`${reason}`);
			let role = message.guild.roles.find("name", "Sunucu Destek Ekibi");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "Genel Sorumlu");
			let role4 = message.guild.roles.find("name", "Firma Sahibi");
			c.overwritePermissions(role, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role3, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role2, {
				SEND_MESSAGES: false,
				READ_MESSAGES: false,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role4, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(message.author, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.send({embed: {
				color: 3447003,
				author: {
					name: `${message.author.username} için destek hattı oluşturuldu.`,
					icon_url: message.author.avatarURL
				},
				//title: "Ticket oluşturuldu!",
				//url: "https://www.keyubu.com/",
				description: `${message.author.username} için destek hattı oluşturuldu.\n\nBu kanalda sorununuzla ilgili bilgi veriniz.\nYetkilileri etiketlemeyin, müsait olunca ticket cevaplanılır.\nSorununuz çözüldüğü zaman `-kapat` yazarak odayı kapatınız.`,
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "© Keyubu"
				}
			}
			});
		});
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		//.setAuthor("Keyubu Ticket", message.guild.iconURL)
		//.setThumbnail(message.guild.iconURL)
		.addField("Destek talebin alındı:", "Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.")
		message.channel.send({embed: embed});
	}
	if (message.content.toLowerCase().startsWith(`-kapat`) || message.content.toLowerCase().startsWith(`-close`)) {
		if (!message.channel.name.startsWith(`🎫`)) return message.channel.send(`Ticket kanalı dışında bu komutu kullanamazsın.`);
		message.channel.send(`Kanalı silmek istediğine eminsen **-onayla** yaz.`)
		.then((m) => {
			message.channel.awaitMessages(response => response.content === '-onayla', {
				max: 1,
				time: 10000,
				errors: ['time'],
			})
			.then((collected) => {
				message.channel.delete();
			})
			.catch(() => {
				m.edit('Kapatma onayının süresi doldu.').then(m2 => {
					m2.delete();
				}, 3000);
			})
		});
	}
});
client.login(process.env.keyubu_token);
