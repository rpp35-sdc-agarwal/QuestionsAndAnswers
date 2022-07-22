var chai = require('chai');
var expect = require('chai').expect;
var http = require('chai-http');
var app = require('../index.js');

chai.use(http);

describe('Api Routes', () => {
  it('get questions returns the proper status code and data shape', (done) => {
    chai.request(app)
      .get('/qa/questions?product_id=1000')
      .send({ product_id: 1000 })
      .end(function(err, res) {
        if(err) {
          console.log(err);
          done();
        }
        expect(res).to.have.status(200);
        expect(typeof res.body.product_id).to.eql('string');
        expect(Array.isArray(res.body.results)).to.eql(true);
        expect(typeof res.body.results[0]).to.eql('object');
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
          expect(res.body.question).to.eql('1000');
          expect(typeof res.body.count).to.eql('number');
          expect(Array.isArray(res.body.results)).to.eql(true);
          expect(res.body.results.length).to.eql(res.body.count);
        }
        done();
      });
  });

  it('posting a question returns the proper status code and data', (done) => {
    chai.request(app)
      .post('/qa/questions')
      .send({
        body: 'how do I turn it on',
        name: 'loaf',
        email: 'email address',
        product_id: 1000
      })
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          expect(res).to.have.status(201);
          expect(res.text).to.equal('Question posted!');
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



