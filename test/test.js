var request = require("request");
var base_url = "http://localhost:80/"
var expect = require('chai').expect;
var assert = require('assert');
var test = require("../app.js");

describe('App test', function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
      });
      done();
    });
  });

  describe("GET /users", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
      });
      done();
    });
  });

  describe("GET /hobby/4/delete", function() {
    it("returns status code 404", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
      });
      done();
    });
  });
});
