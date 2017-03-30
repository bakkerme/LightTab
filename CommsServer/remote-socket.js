"strict mode";

const pluginPort = 48765;
const io = require('socket.io')();
let onMessageReceivedCallback = null
class RemoteSocket {
  openSocket() {
    io.on('connection', (client) => {
      console.log('connected');
      client.on('message', (data) => this.onMessageReceive(data));
    });
    
    io.listen(48765);
  }

  sendObject(message) {
    io.emit('message', message);
  }

  registerOnMessageReceived(func) {
    onMessageReceivedCallback = func;
  }

  onMessageReceive(data) {
    console.log(data);
    onMessageReceivedCallback(data);
  }

  onDisconnect() {
    console.log('disconnect');
  }
}

module.exports = RemoteSocket;
