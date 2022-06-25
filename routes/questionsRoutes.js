const express = require('express');
const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sdc'
};
const db = pgp(config);
const router = express.Router();

router.use((req, res, next) => {
  console.log('qRoute');
  next();
});

// router.get('/test', (req, res) => {
//   res.send('test successful');
// });

router.get('/', (req, res) => {
  //parse the req body
  //retrieve the product id, page number if there is one and the result count

  // db.any('SELECT * FROM qa.questions')
  //   .then((res) => {console.log(res)})
  //   .catch((err) => {console.log(err)});
  res.status(200).send('Questions');
})

router.get(':question_id/answers', (req, res) => {
  res.status(200).send(`Answers for Question id ${req.params.question_id}`)
})

router.post('/qa/questions', (req, res) => {
  res.status().send()
})

router.post(':question_id/answers', (req, res) => {
  res.status().send()
})

router.put(':question_id/helpful', (req, res) => {
  res.status().send()
})

router.put(':question_id/report', (req, res) => {
  res.status().send()
})

module.exports = router;