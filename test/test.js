var request = require('request');
var base_url = "http://localhost:80/"
var http = require('http');
var expect = require('chai').expect;
var assert = require('assert');
var test = require("../app");
var supertest = require('supertest');
var agent = supertest.agent(test);
var server = supertest.agent('http://localhost:80/');


function loginUser() {
    return function(done) {
        agent
            .post('/login')
            .send({ username: 'admin', password: 'insecurepassword' })
            .expect(302)
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};

describe('GET /', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:80/', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('GET /login', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:80/login', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('GET /logout', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:80/logout', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('POST /login', function() {
  it('should create a session logged in with admin username and password and should return 302', function(done){
    agent.post('/login')
    .send({username: 'admin', password: 'insecurepassword' })
    .end(function(err, res) {
      expect(res.status).to.equal(302);
      done();
    });
  });
});

describe('GET /hobby/:id/delete', function () {
  it('Only admin can delete hobbies therefore should return 403', function (done) {
    http.get('http://localhost:80/hobby/:id/delete', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('GET /hobby/:id/delete', function(){
    it('should login with admin credentials and return 302', loginUser());
    it('should successfully delete and return 302', function(done){
    agent
        .get('/hobby/:id/delete')
        .expect(302)
        .end(function(err, res){
            if (err) return done(err);
            done()
        });
    });
});





describe('GET /invalidURL', function () {
  it('should return 404', function (done) {
    http.get('http://localhost:80/asasd', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
