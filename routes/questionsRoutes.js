const express = require('express');
const db = require('./connections/db.js');
const client = require('./connections/redisConnect.js');
const router = express.Router();

/////////////////////
//get
/////////////////////



router.get('/', (req, res) => {
  client.get('key')
    .then((value) => {console.log(value);})
  //parse the req body
  //retrieve the product id, page number if there is one and the result count
  //use redis to get the value stored at the product id
  //if no value is stored get the data the conventional way
  //stringify the data and store it in the redis cache
  db.any(`SELECT qa.questions.question_id, question_body, question_date, asker_name, email, question_helpfulness, reported, id, body, date, answerer_name, answer_email, answer_reported, helpfulness, photo_id, url FROM qa.questions LEFT JOIN qa.answers ON qa.answers.question_id = qa.questions.question_id LEFT JOIN qa.photos ON qa.answers.id = qa.photos.answer_id WHERE product_id = ${req.query.product_id} AND qa.questions.reported = false AND qa.answers.answer_reported = false;`)
    .then((data) => {
      var questions = {
        product_id: req.query.product_id
      };
      var photos = {};
      for (var i = 0; i < data.length; i++) {
        //if the question exists skip its creation
        var curr = data[i];
        var questionId = curr.question_id;
        var answerId = curr.id;

        var qDate = new Date(parseInt(curr.question_date));
        var aDate = new Date(parseInt(curr.date));

        if (questions[questionId] === undefined) {
          var newQ = {
            question_id: questionId,
            question_body: curr.question_body,
            question_date: qDate.toJSON(),
            asker_name: curr.asker_name,
            question_helpfulness: curr.question_helpfulness,
            reported: curr.reported,
            answers: {
              [answerId]: {
                id: answerId,
                body: curr.body,
                date: aDate.toJSON(),
                answerer_name: curr.answerer_name,
                helpfulness: curr.helpfulness,
                photos: []
              }
            }
          }
          if (curr.photo_id) {
            var newP = {
              photo_id: curr.photo_id,
              url: curr.url,
            }
            newQ.answers[answerId].photos.push(newP);
          }
          questions[questionId] = newQ
        } else if (!questions[questionId].answers[answerId]){
          questions[questionId].answers[answerId] = {
            id: answerId,
            body: curr.body,
            date: aDate.toJSON(),
            answerer_name: curr.answerer_name,
            helpfulness: curr.helpfulness,
            photos: []
          }
          if (curr.photo_id) {
            var newP = {
              photo_id: curr.photo_id,
              url: curr.url,
            }
            questions[questionId].answers[answerId].photos.push(newP);
          }
        } else {
          //the question and answer are both already defined
          //we know the photo is not defined as its the only possibility left for this data to exist
          //create a new photo object and insert it into the current question id and answer id photos array
          var newP = {
            photo_id: curr.photo_id,
            url: curr.url,
          }
          questions[questionId].answers[answerId].photos.push(newP);
        }
      }

      return questions;
    })
    .then((shapedData) => {
      var results = [];
      //iterate through the questions object and place all questions in the correct final shape for returning the data
      for (var questionId in shapedData) {
        if (questionId === 'product_id') {
          continue;
        }
        results.push(shapedData[questionId]);
      }
      var finalShape = {
        product_id: shapedData.product_id,
        results: results
      };

      res.status(200).send(finalShape);
    })
    .catch((err) => {res.status(500).send(err)});
})

router.get('/:question_id/answers', (req, res) => {


  db.any(`SELECT id, body, date, answerer_name, answer_reported, helpfulness, photo_id, url FROM qa.answers LEFT JOIN qa.photos ON qa.photos.answer_id = qa.answers.id WHERE question_id = ${req.params.question_id} AND qa.answers.answer_reported = false;`)
    .then((data) => {
      //iterate through the data sent from the db
      var answers = {};
      for (var i = 0; i < data.length; i++) {
        var currAns = data[i];
        var ansId = data[i].id;
        var phoId = data[i].photo_id
        if (!answers[ansId]) {
          var aDate = new Date(parseInt(currAns.date));
          var newA = {
            id: ansId,
            body: currAns.body,
            date: aDate.toJSON(),
            answerer_name: currAns.answerer_name,
            helpfulness: currAns.helpfulness,
            photos: []
          }
          if (currAns.photo_id) {
            var newP = {
              photo_id: currAns.photo_id,
              url: currAns.url,
            }
            newA.photos.push(newP);
          }
          answers[ansId] = newA;
        } else {
          var newP = {
            photo_id: currAns.photo_id,
            url: currAns.url
          }
          answers[ansId].photos.push(newP);
        }
      }
      return answers;
    })
    .then((answers) => {
      var results = [];
      for (var ansId in answers) {
        results.push(answers[ansId]);
      }
      var finalShape = {
        question: req.params.question_id,
        count: results.length,
        results: results
      }
      res.status(200).send(finalShape);
    })
    .catch((err) => {console.log(err); res.status(500).send(err)});
})

/////////////////////
//post
/////////////////////
router.post('/', (req, res) => {
  //insert query that will use the data from the body as its arguments
  //create a new date when the question is recieved, in the millisecond format and send it as a string to the db,
  var date = new Date().valueOf().toString();
  //helpfulness will initially be set to 0 and reported will be false
  db.none(
    `INSERT INTO qa.questions (product_id, question_body, question_date, asker_name, email, question_helpfulness, reported)
        VALUES (${req.body.product_id},'${req.body.body}','${date}','${req.body.name}', '${req.body.email}', 0, false)`
  )
    .then((data) => {
      console.log(data);
      res.status(201).send('Question posted!');
    })
    .catch((err) => {res.status(500).send('Unable to post question at this time')})
})

router.post('/:question_id/answers', (req, res) => {
  var date = new Date().valueOf().toString();
  db.none(
    `INSERT INTO qa.answers (body, date, answerer_name, answer_email, question_id, answer_reported, helpfulness)
    VALUES ('${req.body.body}','${date}', '${req.body.name}', '${req.body.email}', ${req.params.question_id}, false, 0)`
  )
    .then((data) => {
      console.log(data);
      res.status(201).send(`Answer posted for question ${req.params.question_id}`);
    })
    .catch((err) => {res.status(500).send('Unable to post answer at this time')})
})

/////////////////////
//put
/////////////////////

router.put('/:question_id/helpful', (req, res) => {

  db.none(`UPDATE qa.questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${req.params.question_id}`)
    .then((data) => {
      console.log(data);
      res.status(201).send(`Question ${req.params.question_id} marked as helpful`);
    })
    .catch((err) => {console.log(err); res.status(500).send('Unable to update question at this time')})
})

router.put('/:question_id/report', (req, res) => {

  db.none(`UPDATE qa.questions SET reported = true WHERE question_id = ${req.params.question_id}`)
  .then((data) => {
    console.log(data);
    res.status(201).send(`Question ${req.params.question_id} reported`);
  })
  .catch((err) => {console.log(err); res.status(500).send('Unable to update question at this time')})
})

module.exports = router;