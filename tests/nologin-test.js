var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest');

describe('GET /users/login', function(done){
        it('should return a 200 response if the user is logged in', function(done){
        request(app).get('/users/login')
        .expect(200, done);
      });
      
    it('Access homepage, it should return a 302 response and redirect to /users/login', function(done){
        request(app).get('/homepage')
        .expect('Location', '/users/login')
        .expect(302, done);
      });

    it('Access healthReport, it should return a 302 response and redirect to /users/login', function(done){
        request(app).get('/healthReport')
        .expect('Location', '/users/login')
        .expect(302, done);
      });

    it('Access tripAnalysis, it should return a 302 response and redirect to /users/login', function(done){
        request(app).get('/tripAnalysis')
        .expect('Location', '/users/login')
        .expect(302, done);
      });
    });


    

    
