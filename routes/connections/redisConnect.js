const Redis = require('ioredis');
const client = new Redis(6739, '52.52.238.201', {connectTimeout: 10000});


module.exports = client;