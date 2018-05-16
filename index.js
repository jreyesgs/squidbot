const config = require("./config");
const TelegramBot = require('node-telegram-bot-api');
const Twit = require('twit');
const http = require('http');

const tweeted = {},
      load_time = Math.round(new Date().getTime() / 1000),
      contador = 0,
      idActual = 100;

/*
* Telegram
*/
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
/*
* Setup twitter api
*/
var T = new Twit({
    consumer_key:         config.TWITTER.consumer_key,
    consumer_secret:      config.TWITTER.consumer_secret,
    access_token:         config.TWITTER.access_token_key,
    access_token_secret:  config.TWITTER.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })


/** VARIABLES DE TIEMPO **/

var datos = new Date();
var tiempo = datos.getTime();

function cuantoTiempo(){
    var datos = new Date();
    var milisegundo = datos.getTime();
    
    
    var horas    =  parseInt((((milisegundo - tiempo)/1000)/60)/60);
    var minutos  =  parseInt(((milisegundo - tiempo)/1000)/60) - horas * 60;
    var segundos =  parseInt((milisegundo - tiempo)/1000) - (minutos * 60) - (horas * 60 * 60); 
    ;
    //var tiempoTrans =  (milisegundo - tiempo)/1000;
    if (horas < 10) {
      horas = "0" + horas;  
    };

    if (minutos<10) {
        minutos = "0" + minutos;
    };

    if (segundos < 10) {
        segundos = "0" + segundos;
    };

    return tiempoTrans = horas + ":" + minutos + ":" + segundos;
}

/* */

var keyWords = ["scrum","#html5", "#css3", "#javascript", "#nodejs", "#tutorial", "#express", "#mongodb"];

var global = this;

/* var cadena="/search.json?q="+keyWords[0]; */

var lon = keyWords.length , cadena = '';

function lipiador(cadena)

{
    valor = cadena.replace('#','%23')
    return valor;
}

for(i=1; i<lon; i++){
    cadena+= "+OR+"+lipiador(keyWords[i]);
}

var query = lipiador(keyWords[0]) + cadena;
//console.log('query:' + query);
var since_id = "0";
var valorEnlace = false;
var params = 
            {
                lang : 'es',

                result_type : 'recent',

                results_per_page : 30,

                since_id: ''
            };

var contadorTweets = 0;

function buscaTweets(){

params.since_id = since_id;
  T.get('search/tweets', { q: '#generative', lang : 'es', result_type : 'recent', count: 100 }, function(err, data, response) {
    if(data){
        console.log("Encontrados " + data.statuses.length + " tweets");     
        for(i=0; i < data.statuses.length; i++){
                //console.log(data.statuses[i].text + "\n"); 
                //console.log("valor: " + valora(data.statuses[i].text,keyWords) + "\n");
                valorTweet = valora(data.statuses[i].text,keyWords);
                //console.log("------------------------------------------------------------------------------------- \n");
                contadorTweets++;
                var nick = data.statuses[i].from_user;
                var idURL = data.statuses[i].id_str;
                var tweet = data.statuses[i].text;
                var enlace = tweet.indexOf("http://");
                 if(enlace!=-1){
                    //console.log("Contiene enlace\n");
                    valorEnlace = true;
                }else{
                    //console.log("No contiene enlace\n");
                    valorEnlace = false;
                }
                if((valorTweet >= 2) && (valorEnlace == true))
                {
                    bot.sendMessage(msg.chat.id, "Hola @jreyesgs he encontrado este tweet para ti: <a href='https://twitter.com/"+nick+"/status/"+idURL+"'>Tweet</a>",{parse_mode: 'HTML'});
                    console.log(fverde+"Hola @jreyesgs he encontrado este tweet para ti: https://twitter.com/"+nick+"/status/"+idURL+" #btv2"+reset+"\n");
                }   
        }
        /*//console.log(data.statuses); */

        
        //console.log("idBase: " + data.max_id_str+"\n");
        //console.log("Añadidos: " + data.statuses.length + "\n");
        //console.log("Encontrados totales: " + contadorTweets + "\n");
        //console.log("Tiempo transcurrido: " + cuantoTiempo() + "\n");
        since_id=data.max_id_str;
        
    }else{
       console.log("Se ha producido un error: " + e);
    }
  })
  
}

/*
* Primary wrapper function
*/

function valora(eltweet, valores){
    eltweet = eltweet.toLowerCase();
    var lon = valores.length;
    var puntos = 0;
    for(var q=0;q<lon; q++){
        if(eltweet.indexOf(valores[q].toLowerCase())!=-1){
            //console.log("Encontrado: " + fverde +valores[q]+reset+"\n");
            puntos++;
        }
    }
    return puntos;
}

setInterval(function() {buscaTweets();}, 1000*30);
buscaTweets();

