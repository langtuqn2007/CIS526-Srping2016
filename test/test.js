var request = require("request");
var base_url = "http://localhost:80/"
var http = require('http');
var expect = require('chai').expect;
var assert = require('assert');
var test = require("../app.js");


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

describe('POST /login', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:80/login', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('GET /asasd', function () {
  it('should return 404', function (done) {
    http.get('http://localhost:80/asasd', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
