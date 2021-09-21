var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

//let's set up the data we need to pass to the login method
const userCredentials = {
  email: 'test01@test.com', 
  password: '123456'
}
//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);
before(function(done){
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/home');
      done();
    });
});