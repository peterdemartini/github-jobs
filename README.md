Github Jobs API
===========

NPM module for Github Jobs API [https://jobs.github.com/api](https://jobs.github.com/api)

## Installation:

````
npm install github-jobs
````

### Require

````
var jobs = require('github-jobs');
````


## API

### Find

Search for positions

````
jobs.find([params], [callback]);//Return a promise
````

#### Parameters:

**page :** Used for pagination (optional) [default = 0]

**timeout :** Timeout in milliseconds (optional) [default = 10000]

**term :** A search term, such as "ruby" or "java". This parameter is aliased to search. (optional)

**location :**  A city name, zip code, or other location search term.
 A city name, zip code, or other location search term. (optional)

**lat :**  A specific latitude. If used, you must also send long and must not send location. (optional)

**long :** A specific longitude. If used, you must also send lat and must not send location. (optional)

**full_time :** If you want to limit results to full time positions set this parameter to 'true'. (optional)

#### Callback:

````
function(err, jobs){
    ...
}
````

### Find By Id

Find a position by the position id.

```javascript
jobs.findById(id, [callback]);//Return a promise
```


### Full Example

* With Promise

```javascript
    var jobs = require('github-jobs');
    jobs.find({
        term : 'Node.js'
    }).then(function(results){
        console.log('Found ' + results.length + ' jobs.');
        results.forEach(function(job){
            jobs.findById(job.id).then(function(result){
                console.log('Job : ', result);
            }).catch(function(err){
              console.log('Error: ', err);
            });
        });
    }).catch(function(err){
      console.log('Error: ', err);
    });
```

* With callback

```javascript
    var jobs = require('github-jobs');

    jobs.find({
        term : 'Node.js'
    }, function(err, results){
        if(err){
            return console.log('Error: ', err);
        }

        console.log('Found ' + results.length + ' jobs.');

        results.forEach(function(job){
            jobs.findById(job.id, function(err, result){
                if(err){
                    return console.log('Error: ', err);
                }
                console.log('Job : ', result);
            });
        });
    });
```
## How to contribute
Please check all tests after submit a merge request.

To run unit tests execute in the project folder execute
```bash
  node_modules/mocha/bin/mocha test/
```
