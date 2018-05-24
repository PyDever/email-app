

const request = require("request")

var main = function (port) {
    request({url: `http://localhost:${port}/about`, json: true}, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("[POSTMAN] success. your about page is live.")
        } else {
            console.log("[POSTMAN] failure. your about page is down.")
            console.log(error, response.statusCode)
        }
      });
}

main(3000)