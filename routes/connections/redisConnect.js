const Redis = require('ioredis');
const client = new Redis({port:6379, host:'52.52.238.201', connectTimeout: 10000});


module.exports = client;