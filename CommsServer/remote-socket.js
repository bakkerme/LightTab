"strict mode";

let pluginPort = 48765;
class RemoteSocket {
  constructor() {
    if (typeof pluginPort !== 'number') {
      console.log(JSON.stringify(
        {
          status: 'error',
          message: 'Provided port is invalid'
        }
      ));
    }
  }

  openSocket() {
    let io = require('socket.io')();
    io.on('connection', function (client) {
      client.on('event', (data) => {
        console.log(data);
      });
      client.on('disconnect', function () { });
    });
    io.listen(48765);
  }
}

module.exports = RemoteSocket;
