const Redis = require('ioredis');
const client = new Redis(6739, 'ubuntu@52.52.238.201');

module.exports = client;