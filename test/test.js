var chai = require('chai');
var expect = require('chai').expect;
var http = require('chai-http');
var app = require('../index.js');

chai.use(http);

describe('Hello world server', () => {
  it('Responds with proper content', (done) => {
    chai.request(app).get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.text).to.equal('Hello World!');
          expect(res.status).to.equal(200);
          done();
         })
  })

  it('Responds correctly to different routes', (done) => {
    chai.request(app).get('/qa/questions')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.text).to.equal('Questions');
      expect(res.status).to.equal(200);
    })
    chai.request(app).get('/qa/questions/1000/answers')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.text).to.equal('Answers for Question id 1000');
      expect(res.status).to.equal(200);
      done();
    })
  })
})