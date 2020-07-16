const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
var uhhuh = false;

client.on('ready', () => {
	require('./server.js');
});

client.on('message', msg => {
		if (msg.content.includes('!analogy')){
			var cmd = msg.content.replace(/ /g, "").replace("!analogy","")
			if(!cmd){
				msg.channel.send("Please provide a measurement to analogize.");
			} else {
				axios.get("https://tomscott.com/analogizer/api?q=" + cmd)
					.then(resp => {
						msg.channel.send("According to " + resp.data.source + ", " + resp.data.text);
					});
			}
		}
		if (msg.content.includes('!api')){
			var cmd = msg.content.replace(/ /g, "").replace("!api","")
			if(!cmd){
				msg.channel.send("Please provide a resource to GET.");
			} else {
				axios.get(cmd)
					.then(resp => {
						msg.channel.send(JSON.stringify(resp.data))
							.catch(err => {
								msg.channel.send(err.toString());
							});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!dynamiclink')){
			var cmd = msg.content.replace(/ /g, "").replace("!dynamiclink","")
			if(!cmd){
				msg.channel.send("Please provide a link to shorten.");
			} else {
				axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + process.env.FB_API, {
					longDynamicLink: "https://sbotdiscord.page.link/?link=" + cmd
				})
					.then(resp => {
						console.log(resp.data)
						msg.channel.send(resp.data.shortLink)
							.catch(err => {
								msg.channel.send(err.toString());
							});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!beep')){
			msg.channel.send("BEEP!");
		}
		if (msg.content.includes('!comadd')){
			var cmd = msg.content.replace(/ /g, "").replace("!comadd","")
			if(!cmd){
				msg.channel.send("Please provide a value to POST.");
			} else {
				axios.post('https://beeplinks.firebaseio.com/.json', '"' + cmd + '"')
					.then(resp => {
						msg.channel.send("All set! Use the key " + resp.data.name + " to access your data.")
							.catch(err => {
								msg.channel.send(err.toString());
							});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!comget')){
			var cmd = msg.content.replace(/ /g, "").replace("!comget","")
			if(!cmd){
				msg.channel.send("Please provide a key to GET.");
			} else {
				axios.get('https://beeplinks.firebaseio.com/' + cmd + '.json')
					.then(resp => {
						msg.channel.send(resp.data)
							.catch(err => {
								msg.channel.send(err.toString());
							});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!blogger')){
			var cmd = msg.content.replace(/ /g, "").replace("!blogger","")
			if(!cmd){
				msg.channel.send("Please provide a blog ID.");
			} else {
				axios.get('https://www.googleapis.com/blogger/v3/blogs/' + cmd + '/posts?key=' + process.env.BLOG_KEY)
					.then(resp => {
						msg.channel.send(resp.data.items[0].url)
							.catch(err => {
								msg.channel.send(err.toString());
							});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!github')){
			var cmd = msg.content.replace(/ /g, "").replace("!github","")
			if(!cmd){
				msg.channel.send("Please provide a username.");
			} else {
				axios.get('https://api.github.com/users/' + cmd + '/repos')
					.then(resp => {
						resp.data.forEach(item => {
							msg.channel.send(item.name)
							.catch(err => {
								msg.channel.send(err.toString());
							});
						});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
		if (msg.content.includes('!story')){
			if(uhhuh){
				uhhuh = false;
			} else {
				uhhuh = true;
			}
		}
		if (uhhuh && msg.author.id != client.user.id){
			msg.channel.send("Uh-huh.")
		}
		if (msg.content.includes('!name')){
			axios.get('https://name-generator.samuelblue.repl.co/')
				.then(resp => {
					msg.channel.send(resp.data.img);
					msg.channel.send(resp.data.fname + " " + resp.data.lname);
				})
				.catch(err => {
					msg.channel.send("There was an error getting your data: " + err);
				});
		}
		if (msg.content.includes('!ctatt')){
			var cmd = msg.content.replace(/ /g, "").replace("!ctatt","")
			if(!cmd){
				msg.channel.send("Please provide a Stop ID.");
			} else {
				axios.get('http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' + process.env.CTA_KEY + '&mapid=' + parseInt(cmd, 10) + '&outputType=JSON')
					.then(resp => {
						msg.channel.send("Next arrivals for " + resp.data.ctatt.eta[0].staNm + ":");
						resp.data.ctatt.eta.forEach(item => {
							msg.channel.send(item.destNm + ": " + item.arrT.split("T")[1])
							.catch(err => {
								msg.channel.send(err.toString());
							});
						});
					})
					.catch(err => {
						msg.channel.send("There was an error getting your data: " + err);
					});
			}
		}
});

client.login(token);