
const request = require("request")

var main = function (port) {
    request({url: `http://localhost:${port}/`, json: true}, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("[POSTMAN] success. your server is live.")
        } else {
            console.log("[POSTMAN] failure. your server is down.")
        }
      });
}

main(3000)

