// const newrelic = require('newrelic');
// const redis = require('redis');
const client = redis.createClient({url:'redis://ubuntu@52.52.238.201:6739'});
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const qRouter = require('./routes/questionsRoutes.js');
const aRouter = require('./routes/answersRoutes.js');
const cors = require('cors');

// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('/qa/questions', qRouter);
app.use('/qa/answers', aRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/loaderio-b7adecd4f0a1dd2ed05ad3841c798d1b.txt', (req, res) => {
  res.sendFile('/home/ec2-user/QuestionsAndAnswers/loaderio-b7adecd4f0a1dd2ed05ad3841c798d1b.txt');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;