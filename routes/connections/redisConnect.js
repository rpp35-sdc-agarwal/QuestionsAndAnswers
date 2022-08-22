const Redis = require('ioredis');
const client = new Redis({port:6379, host:'52.52.238.201', password:"Axolotl3421sinnoh", connectTimeout: 10000});


module.exports = client;