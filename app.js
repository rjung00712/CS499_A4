var express = require('express');
var elasticsearch = require('elasticsearch');
var request = require('request');
var parseString = require('xml2js').parseString;
var universalStudiosWaitTimeURL = 'http://www.universalstudioshollywood.com/waittimes/?type=all&site=USH';

var client = elasticsearch.Client( {
   host: 'search-my-wait-time-es-vp44rjh7qhndk4uhw6wyaozr3a.us-west-1.es.amazonaws.com',
   log: 'info'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 5000
}, function(error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        // getXmlWaitTime();
        fetchWaitingtimes();
        console.log('All is well');
    }
});

// var getXmlWaitTime = function () {
//     request(universalStudiosWaitTimeURL, function (error, response, body) {
//         if (error) {
//             console.error(error);
//             console.log("getting XML Error");
//         } else {
//             // getJSON(body);
//             var json = JSON.stringify(response);
//             console.log('this worksed');
//         }
//     });
// };


function fetchWaitingtimes() {
    request(universalStudiosWaitTimeURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);

            var waitTimes = [];

            parseString(body, function (err, result) {
                // console.dir(result.rss.channel[0].item);
                var items = result.rss.channel[0].item;
                for(var i = 0; i < items.length; i++) {

                    waitTimes.push({
                        'ride': items[i].title[0],
                        'wait time': items[i].description[0]
                    });
                    console.log(waitTimes[i]);
                    // console.log(items[i].title[0], items[i].description[0]);
                    // putItem(items[i].title[0], items[i].description[0]);
                }
            });
        }
    })
}





