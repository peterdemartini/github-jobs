var rest = require('restler'),
    _ = require('lodash');

var api = function(){
    var base_url = 'https://jobs.github.com/';
    var build_query = function(q, k, v){
        //if(typeof v === 'string') v.replace(' ', '+');
        v = encodeURIComponent(v);
        if(q.length)
            q = q + '&';
        return q + k + '=' + v;
    };
    return {
        find : function(conf, callback){
            var defaults = {
                page : 0,
                timeout : 10 * 1000
            };
            conf = _.extend(defaults, conf);
            //Build Query
            var query = '';
            if(conf.term)
                query = build_query(query, 'description', conf.term);
            if(conf.page)
                query = build_query(query, 'page', conf.page);
            if(conf.location)
                query = build_query(query, 'location', conf.location);
            else if(typeof conf.lat !== 'undefined' && typeof conf.long !== 'undefined'){
                query = build_query(query, 'long', conf.long);
                query = build_query(query, 'lat', conf.lat);
            }
            if(typeof conf.full_time !== 'undefined')
                query = build_query(query, 'full_time', conf.full_time);
            rest.get(base_url + 'positions.json?' + query, {
                timeout: conf.timeout
            }).on('timeout', function(ms){
                callback('Timeout, github jobs api didn\'t respond in ' + ms + ' ms');
            }).on('complete',function(data){
                callback(null, data);
            }).on('error',function(err){
                callback(err);
            });
        },
        findById : function(id, callback){
            if(!id){
                return callback('Position ID must be present');
            }
            rest.get(base_url + 'positions/' + id + '.json')
            .on('complete',function(data){
                callback(null, data);
            }).on('error',function(err){
                callback(err);
            });
        }
    };
};

module.exports = api();
