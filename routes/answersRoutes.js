const express = require('express');
const db = require('./connections/db.js');
const cache = require('./connections/redisConnect.js');
const router = express.Router();

router.put('/:answer_id/helpful', (req, res) => {
  db.none(`UPDATE qa.answers SET helpfulness = helpfulness + 1 WHERE id = ${req.params.answer_id}`)
    .then((data) => {
      console.log(data);
      res.status(201).send(`Answer ${req.params.answer_id} marked as helpful`);
    })
})

router.put('/:answer_id/report', (req, res) => {
  db.none(`UPDATE qa.answers SET answer_reported = true WHERE id = ${req.params.answer_id}`)
    .then((data) => {
    console.log(data);
    res.status(201).send(`Answer ${req.params.answer_id} reported`);
  })
})

module.exports = router;