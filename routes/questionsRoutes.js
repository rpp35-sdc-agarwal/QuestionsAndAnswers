const express = require('express');
const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'sdc'
};
const db = pgp(config);
const router = express.Router();

// router.get('/test', (req, res) => {
//   res.send('test successful');
// });
/////////////////////
//get
/////////////////////
router.get('/', (req, res) => {
  //parse the req body
  //retrieve the product id, page number if there is one and the result count
  // db.any('SELECT * FROM qa.questions')
  //   .then((res) => {console.log(res)})
  //   .catch((err) => {console.log(err)});
  res.status(200).send('Questions');
})

router.get('/:question_id/answers', (req, res) => {
  res.status(200).send(`Answers for question ${req.params.question_id}`);
})

/////////////////////
//post
/////////////////////
router.post('/', (req, res) => {
  res.status(201).send('Question posted')
})

router.post('/:question_id/answers', (req, res) => {
  res.status(201).send(`Answer posted for question ${req.params.question_id}`);
})

/////////////////////
//put
/////////////////////
router.put('/:question_id/helpful', (req, res) => {
  res.status(201).send(`Question ${req.params.question_id} marked as helpful`);
})

router.put('/:question_id/report', (req, res) => {
  res.status(201).send(`Question ${req.params.question_id} reported`);
})

module.exports = router;