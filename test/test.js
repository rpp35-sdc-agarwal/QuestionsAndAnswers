var chai = require('chai');
var expect = require('chai').expect;
var http = require('chai-http');
var app = require('../index.js');

chai.use(http);

describe('Api Routes', () => {
  it('get questions responds correctly', (done) => {
    chai.request(app).get('/qa/questions')
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Questions');
        }
        done();
      });
  });

  it('get question answers responds correctly', (done) => {
    chai.request(app)
      .get('/qa/questions/1000/answers')
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Answers for question 1000');
        }
        done();
      });
  });

  it('posting a question responds properly', (done) => {
    chai.request(app)
      .post('/qa/questions')
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Question posted');
        }
        done();
      });
  });

  it('posting an answer responds properly', (done) => {
    chai.request(app)
      .post('/qa/questions/1000/answers')
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Answer posted for question 1000');
        }
        done();
      });
  });

  it('marks a question as helpful', (done) => {
    chai.request(app)
      .put('/qa/questions/1000/helpful')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Question 1000 marked as helpful');
        }
        done();
      });
  });

  it('marks a question as reported', (done) => {
    chai.request(app)
      .put('/qa/questions/1000/report')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Question 1000 reported');
        }
        done();
      });
  });

  it('marks an answer as helpful', (done) => {
    chai.request(app)
      .put('/qa/answers/1000/helpful')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Answer 1000 marked as helpful');
        }
        done();
      });
  });

  it('marks an answer as reported', (done) => {
    chai.request(app)
      .put('/qa/answers/1000/report')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Answer 1000 reported');
        }
        done();
      });
  });
});



