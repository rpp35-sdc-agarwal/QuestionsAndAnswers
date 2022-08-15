const redis = require('redis');
const client = redis.createClient({url:'redis://ubuntu@52.52.238.201:6739'});

client.on('error', (err) => console.log('Redis Client Error', err));

var cache = client.connect();

module.exports = cache;