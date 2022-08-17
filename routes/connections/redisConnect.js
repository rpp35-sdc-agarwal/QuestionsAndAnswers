const Redis = require('ioredis');
const client = new Redis({
  port: 6739,
  host: 'ubuntu@52.52.238.201',
  connectTimeout: 10000
});

module.exports = client;