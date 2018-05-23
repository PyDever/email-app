
// import express and the templating engine
const express = require('express')
const exphbs = require('express-handlebars')

// import the http request library 
const http = require('http')

// create a new instance of an application server
const app = express()

// configure all the templating and public styles
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// make express use the public folder 
app.use(express.static('public'))

// write a handler for the index route
app.get ('/', function (req, res) {

    var queryString = req.query.term
    var term = encodeURIComponent(queryString)

    // grab the remote address from the request object
    const remoteAddress = req.connection.remoteAddress

    console.log(`[GET] Request from ${remoteAddress}`)
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    // make a get request to the giphy server 
    http.get(url, function (response) {

        // set the response encoding to UTF-8
        response.setEncoding('utf-8')
        var body = ''
        response.on('data', function(d) {
            body += d
        });

         response.on('end', function(){
            var parsed = JSON.parse(body)
            res.render('home', {gifs: parsed.data})
         })
    })
}) 

// listen in on port 3000 for incoming requests
app.listen(3000, function() {

    // alert the client that magic happens on port 3000
    console.log("magic happens on port 3000...")
});

