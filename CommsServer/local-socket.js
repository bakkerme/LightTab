"strict mode";
let _ = require('lodash');
let net = require('net');

const pluginSendPort = 48763;
const pluginRecievePort = 48799;
const host = '127.0.0.1';

let socketSendClient = null;
let socketRecieve = null;
let onMessageReceivedCallback = null

class LocalSocket {

  openSocket() {
    this.openSendSocket();
    // this.openRecieveSocket();
  }

  /* Send */
  openSendSocket() {
    socketSendClient = new net.Socket();
    socketSendClient.on('error', function (error) {
      console.log('Error in Send:')
      console.log(error);
      setTimeout(this.openSocket.bind(this), 3000);
    }.bind(this));
    
    socketSendClient.connect(pluginSendPort, host, function () {
      console.log('CONNECTED TO SENDHOST: ' + host + ':' + pluginSendPort);
    });

    socketSendClient.on('data', function (data) {
      console.log('DATA: ' + data);
    });

    socketSendClient.on('close', function () {
      console.log('Connection closed');
    });
  }

  sendObject(object) {
    socketSendClient.write(JSON.stringify(object) + '\n');
  }

  /* Recieve */
  openRecieveSocket() {
    socketRecieve = new net.Socket();
    socketRecieve.on('error', function (error) {
      console.log('Error in Recieve:')
      console.log(error);
      setTimeout(this.openSocket.bind(this), 3000);
    }.bind(this));

    socketRecieve.connect(pluginRecievePort, host, function () {
      console.log('CONNECTED TO RECIEVEHOST: ' + host + ':' + pluginRecievePort);
    });

    socketRecieve.on('data', function (data) {
      console.log(data.toString('utf-8'));
      if (onMessageReceivedCallback) {
        onMessageReceivedCallback(data);
      }
    });

    socketRecieve.on('close', function () {
      // console.log('Connection closed');
    });
  }

  registerOnMessageReceived(func) {
    onMessageReceivedCallback = func;
  }
}

module.exports = LocalSocket;