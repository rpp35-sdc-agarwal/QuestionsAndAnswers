const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/qa/questions', (req, res) => {
  res.status(200).send('Questions');
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  res.status(200).send(`Answers for Question id ${req.params.question_id}`)
})

app.post('/qa/questions', (req, res) => {
  res.status().send()
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.status().send()
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.status().send()
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  res.status().send()
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status().send()
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status().send()
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;