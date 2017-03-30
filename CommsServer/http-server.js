"strict mode";
var qs = require('querystring');

class HttpServer {
  startServer() {
    let http = require('http');
    const PORT = 48764;


    //Create a server
    let server = http.createServer((request, response) => {
      if (request.method == 'POST') {
        let body = '';

        request.on('data', function (data) {
          body += data;

          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
            request.connection.destroy();
        });

        request.on('end', function () {
          let post = qs.parse(body);
        });
      }

      if (this.onRequestCallback) {
        this.onRequestCallback(request, response);
        response.end('It Works!! Path Hit: ' + request.url);
      }
    });

    server.listen(PORT, function () {
      console.log("Http listening on: http://localhost:%s", PORT);
    });
  }

  registerOnRequestRecieved(cb) {
    this.onRequestCallback = cb;
  }
}

HttpServer.onRequestCallback = null

module.exports = HttpServer;