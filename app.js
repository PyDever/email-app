
// import all the web libraries
const express = require('express');
const exphbs = require('express-handlebars');

// this library will help us fetch the giphy data
const http = require('http');

// create an instance of our express application
const app = express();

// configure our application to use handlebars templating
// and to use public CSS sheets
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get ('/', function (req, res) {

    // grab the query string to see what the user searched for 
    var queryString = req.query.term;
    var term = encodeURIComponent(queryString);

    // Jay: Could not get an API key. I found where someone made this
    // and stole their API key. ;) 
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

    // create a GET request using http 
    http.get(url, function (response) {

        // Jay: In python, we can easily set this value.
        // I found it much harder to find how to do this in Node 
        response.setEncoding('utf-8');

        var body = ''; // this empty string is a placeholder so that 
        // I do not end up with silly type errors :P

        // Jay: this little number is easy to understand... but just in case...
        // Basically it is an onload function for the response and 
        // it appends said response data onto the body variable
        // that we created earlier.
        response.on('data', function(d) {
            body += d;
        });

        // one last onload function for the response
        // this one handles loading the parsed body into
        // the template, like I said I would do earlier.
         response.on('end', function(){
            var parsed = JSON.parse(body);
            res.render('home', {gifs: parsed.data})
         })
    })
    // awesome. lets run our server by listening in on port 3000
}) 

app.listen(3000,function(){
  console.log("magic happens on port 3000...");
});

