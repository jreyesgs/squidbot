const config = require("./config");
const TelegramBot = require('node-telegram-bot-api');
 
 // API Token Telegram
 const token = config.TOKEN;

 // Creamos un bot que usa 'polling'para obtener actualizaciones
const bot = new TelegramBot(token, {polling: true});
 const request = require('request');
 
// Cuando mandes el mensaje "Hola" reconoce tú nombre y genera un input: Hola Daniel
 bot.on('message', (msg) => {
   console.log(msg);
   
 var Hola = "hola";
 if (msg.text.toString().toLowerCase().indexOf(Hola) === 0) {
     bot.sendMessage(msg.chat.id, "Hola  " + msg.from.first_name + "<a href='http://www.google.es'>link</a>",{parse_mode: 'HTML'});
 }
 });
