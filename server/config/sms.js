const Nexmo = require('nexmo');
require('dotenv').config({path:__dirname+'/../.env'})

module.exports =  nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

