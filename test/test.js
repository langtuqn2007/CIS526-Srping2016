var request = require('request');
var base_url = "http://localhost:80/"
var http = require('http');
var expect = require('chai').expect;
var assert = require('assert');
var test = require("../app");
var supertest = require('supertest');
var agent = supertest.agent(test);


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
  it('create a session logged in with admin username and password and should return 302', function(done){
    agent.post('/login')
    .send({username: 'admin', password: 'insecurepassword' })
    .end(function(err, res) {
      expect(res.status).to.equal(302);
      done();
    });
  });
});

describe('GET /hobby/:id/delete', function () {
  it('Only admin and delete hobbies and should return 403', function (done) {
    http.get('http://localhost:80/hobby/:id/delete', function (res) {
      assert.equal(403, res.statusCode);
      done();
    });
  });
});

describe('GET /hobby/:id/delete', function () {
  var j = request.jar();
  var requestWithCookie = request.defaults({jar: j});

  before(function(done) {
    requestWithCookie.post('http://localhost:80/login', {username: 'admin', password: 'insecurepassword'},done());
  });

  it('should do something', function (done) {
    requestWithCookie.get('http://localhost:80/hobby/:id/delete', function(err, res, user) {
      assert.equal(200, res.statusCode);
      done();
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
