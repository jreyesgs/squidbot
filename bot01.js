var config = require("./config");
var request = require("request");

class Bot{
  init(TOKEN){
    return new Promise((resolve, reject) => {
      let url = `https://api.telegram.org/bot${TOKEN}/getMe`
      request(url, (error, r, body) => {
        const response = JSON.parse(body).result
        if(error) return
        if(!response) return
        this.id = response.id || ''
        this.first_name = response.first_name || ''
        this.last_name = response.last_name || ''
        this.username = response.username || ''
        this.language_code = response.language_code || ''
        resolve()
      })
    })
   }
   
   getName(){
    if(this.last_name){
      return `${this.first_name} ${this.last_name}`
    }
    else{
      return `${this.first_name}`
    }
   }

   introduceYourself(){
    console.log(`Hola, mi nombre es ${this.getName()}. Puedes hablar conmigo usando mi nombre de usuario: @${this.username}`);
   }
}

const bot = new Bot()
bot.init(config.TOKEN).then(() => {
 bot.introduceYourself()
})