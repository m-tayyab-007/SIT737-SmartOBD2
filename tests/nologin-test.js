var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest');

describe('GET /', function(done){
        it('should return a 200 response', function(done){
        request(app).get('/')
        .expect(200, done);
      });
      
    it('Access homepage, it should return a 302 response and redirect to /', function(done){
        request(app).get('/homepage')
        .expect('Location', '/')
        .expect(302, done);
      });

    it('Access healthReport, it should return a 302 response and redirect to /', function(done){
        request(app).get('/healthReport')
        .expect('Location', '/')
        .expect(302, done);
      });

    it('Access tripAnalysis, it should return a 302 response and redirect to /', function(done){
        request(app).get('/tripAnalysis')
        .expect('Location', '/')
        .expect(302, done);
      });
    });


    

    
