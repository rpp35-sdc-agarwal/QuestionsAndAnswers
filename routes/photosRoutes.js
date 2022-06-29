const express = require('express');
const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sdc'
};
const db = pgp(config);
const pRouter = express.Router();

module.exports = pRouter;