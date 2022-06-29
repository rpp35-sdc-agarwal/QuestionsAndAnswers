const express = require('express');
const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sdc'
};
const db = pgp(config);
const router = express.Router();

router.put('/:answer_id/helpful', (req, res) => {
  res.status(201).send(`Answer ${req.params.answer_id} marked as helpful`);
})

router.put('/:answer_id/report', (req, res) => {
  res.status(201).send(`Answer ${req.params.answer_id} reported`);
})

module.exports = router;