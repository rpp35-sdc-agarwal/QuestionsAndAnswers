const pgp = require('pg-promise')();
const connConfig = {
  host: '13.52.106.252',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'root'
};
const db = pgp(connConfig);

module.exports = db;