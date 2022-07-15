var chai = require('chai');
var expect = require('chai').expect;
var http = require('chai-http');
var app = require('../index.js');

chai.use(http);

describe('Api Routes', () => {
  it('get questions returns the proper status code and data', (done) => {
    chai.request(app)
      .get('/qa/questions')
      .send({ product_id: 1000 })
      .end(function(err, res) {
        if(err) {
          console.log(err);
          done();
        }
        expect(res).to.have.status(200);
        expect(res.body).to.eql([
          {
            question_id: 3506,
            product_id: 1000,
            question_body: 'Quo commodi qui rerum quos dolore voluptas perspiciatis.',
            question_date: '1598318729860',
            username: 'Murray.Bernier',
            email: 'Salma.Pacocha32@hotmail.com',
            helpful: 28,
            reported: false
          },
          {
            question_id: 3507,
            product_id: 1000,
            question_body: 'Beatae illo delectus velit.',
            question_date: '1604283189400',
            username: 'Talon62',
            email: 'Garrick.Pagac@hotmail.com',
            helpful: 7,
            reported: false
          }
        ]);
        done();
      });
  });

  it('get question answers returns the proper status code and data', (done) => {
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

  it('posting a question returns the proper status code and data', (done) => {
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

  it('posting an answer returns the proper status code and data', (done) => {
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



