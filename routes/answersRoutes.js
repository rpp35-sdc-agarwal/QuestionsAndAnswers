const express = require('express');
const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sdc'
};
const db = pgp(config);
const router = express.Router();

router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status().send()
})

router.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status().send()
})

module.exports = router;