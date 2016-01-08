'use strict';
var assert = require("assert");
var jobs = require('../index.js');
describe('Jobs Search tests', function () {
  it('Search findById', function (done) {
      var jobs = require('../index.js');
      jobs.find({
          term : 'Node.js',
          location : 'San Francisco'
      }, function(err, results){
          assert.equal(err, null);
          assert.notEqual(results.length, undefined);
          var job = results[0];
          jobs.findById(job.id, function(err, result){
              assert.equal(err, null);
              assert.notEqual(result.title, undefined);
              done();
          });
      });
  });
  it('Search term with Location', function (done) {
    jobs.find({
      term : 'Node.js',
      location : 'San Francisco'
    }, function(err, results){
      assert.equal(err, null);
      assert.notEqual(results.length, undefined);
      done();
    });
  });
  it('Search term with Location with promise', function (done) {
    jobs.find({
      term : 'Node.js',
      location : 'San Francisco'
    }).then(function(results){
      assert.notEqual(results.length, undefined);
      done();
    });
  });
  it('Search findById with promise', function (done) {
    jobs.find({
      term : 'Node.js',
      location : 'San Francisco'
    }).then(function(results){
      assert.notEqual(results.length, undefined);
      var job = results[0];
      jobs.findById(job.id).then(function(result){
        assert.equal(err, null);
        assert.notEqual(result.title, undefined);
        done();
      });
    });
  });
});
