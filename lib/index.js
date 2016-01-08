'use strict';

var rest = require('restler'),
  URI = require('urijs'),
  _ = require('lodash'),
  Q = require('q');


var api = function() {
  var base_url = 'https://jobs.github.com/';
  return {
    find: function(conf, callback) {
      var defer = Q.defer();
      var defaults = {
        page: 0,
        timeout: 10 * 1000
      };
      conf = _.extend(defaults, conf);
      //Build Query
      var query = {};
      if (conf.term)
        query.description = conf.term;
      if (conf.page)
        query.page = conf.page;
      if (conf.location)
        query.location = conf.location;
      else if (typeof conf.lat !== 'undefined' && typeof conf.long !== 'undefined') {
        query.long = conf.long;
        query.lat = conf.lat;
      }
      if (typeof conf.full_time !== 'undefined')
        query.full_time = !!conf.full_time;
      var url = URI(base_url + 'positions.json').query(query).toString();
      rest.get(
        url, {
          timeout: conf.timeout
        }
      ).on('timeout', function(ms) {
        var err = 'Timeout, github jobs api didn\'t respond in ' + ms + ' ms';
        if (callback) {
          callback(err);
        }
        defer.reject(error_message);
      }).on('complete', function(data) {
        if (callback) {
          callback(null, data);
        }
        defer.resolve(data);
      }).on('error', function(err) {
        defer.reject(err);
        if (callback) {
          callback(err);
        }
      });
      return defer.promise;
    },
    findById: function(id, callback) {
      var defer = Q.defer();
      if (!id) {
        var err = 'Position ID must be present';
        if (callback) {
          callback(err);
        } else {
          defer.reject(err);
        }
      } else {
        rest.get(base_url + 'positions/' + id + '.json')
          .on('complete', function(data) {
            if (callback) {
              callback(null, data);
            }
            defer.resolve(data);
          }).on('error', function(err) {
            defer.reject(err);
            callback(err);
          });
      }
    }
  };
};

module.exports = api();