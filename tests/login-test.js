var supertest = require('supertest');
var app       = require('../server')
var agent     = supertest.agent(app);

describe('Login', function () {
  it('the user is logged in', function(done) {
    agent
      .post('/login')
      .type('form')
      .send({ email: 'test01@test.com' })
      .send({ password: '123456' })
      .expect(302)
      .expect('Location', '/homepage')
      .expect('set-cookie', /connect.sid/)
      .end(function(err, res) {
        if (err) return done(err);
        // agent.saveCookies(res); don‘t need this line 
        return done();
      });
  });


it('get /homepage', function(done) {
// don't need do anything with cookies, agent will  attached cookies automatically based on login above
    agent
      .get('/homepage')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
});

it('get /healthReport', function(done) {
  // don't need do anything with cookies, agent will  attached cookies automatically based on login above
      agent
        .get('/healthReport')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
  });

it('get /tripAnalysis', function(done) {
    // don't need do anything with cookies, agent will  attached cookies automatically based on login above
        agent
          .get('/tripAnalysis')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
    });
});