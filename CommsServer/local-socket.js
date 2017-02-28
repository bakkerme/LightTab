"strict mode";
let _ = require('lodash');
let net = require('net');

const pluginPort = 48763;
const host = '127.0.0.1';
let socketClient = null;
class LocalSocket {
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

  sendObject(object) {
    socketClient.write(JSON.stringify(object) + '\n');
  }

  openSocket() {
    socketClient = new net.Socket();
    socketClient.connect(pluginPort, host, function () {
      
      console.log('CONNECTED TO: ' + host + ':' + pluginPort);
      let value = {
      	param: 'Tint',
      	value: 90
      };

      this.sendObject(value);
    });

    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    socketClient.on('data', function (data) {
      console.log('DATA: ' + data);
      // Close the client socket completely
      // client.destroy();
    });

    // Add a 'close' event handler for the client socket
    socketClient.on('close', function () {
      console.log('Connection closed');
    });
  }
}

module.exports = LocalSocket;