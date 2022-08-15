const redis = require('redis');
const client = redis.createClient({url:'redis://ubuntu@52.52.238.201:6739'});

module.exports = client;