const redis = require('redis');
const client = redis.createClient({url:'redis://ubuntu@52.52.238.201:6739'});

var connection = async function() {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  return 'client connected';
}

connection();

module.exports = client;