
const request = require("request")

var main = function (port) {
    request({url: `http://localhost:${port}/news`, json: true}, 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("[POSTMAN] success. your news page is live.")
        } else {
            console.log("[POSTMAN] failure. your news page is down.")
            console.log(error, response.statusCode)
        }
      });
}

main(3000)
