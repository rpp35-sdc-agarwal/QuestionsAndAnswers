const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const qRouter = require('./routes/questionsRoutes.js');
const aRouter = require('./routes/answersRoutes.js');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('/qa/questions', qRouter);
app.use('/qa/answers', aRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;