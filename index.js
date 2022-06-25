const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const qRouter = require('./routes/questionsRoutes.js');
const aRouter = require('./routes/answerRoutes.js');

app.use(express.json());
app.use(express.urlencoded());
app.use('/qa/questions', qRouter);
app.use('/qa/answers', aRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;