var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest');


const userCredentials = {
    email: 'test01@test.com', 
    password: '123456'
  }
  //let's login the user before we run any tests
var authenticatedUser = request.agent(app);

before(function(done){
    authenticatedUser
      .get('/users/login')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(200);
        expect('Location', '/homepage');
        done();
      });
  });

describe('GET /', function(done){
    // if the user is logged in we should get a 200 status code
    it('should return a 200 response if the user is logged in', function(done){
        authenticatedUser.get('/')
        .expect(200, done);
      });
    
      
    it('should return a 302 response and redirect to /users/login', function(done){
        request(app).get('/homepage')
        .expect('Location', '/users/login')
        .expect(302, done);
      });
    });

