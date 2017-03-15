This is a simple demonstration of using AWS ElasticSearch and Kibana services.
A simple node.js application was implemented that pulls wait time data from XML response from Universal Studios Hollywoord wait times
at http://www.universalstudioshollywood.com/waittimes/?type=all&site=USH.

The app polls this site every 10 minutes, and parses the JSON object to extract data and send to 
ElasticSearch in the cloud. Then Kibana takes these data, aggregates them, and renders a visual display of the stats.
