"strict mode";

const pluginPort = 48765;
const io = require('socket.io')();
let onMessageReceivedCallback = null
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

  //@TODO probably genericise this out
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

  openSocket() {
    io.on('connection', (client) => {
      console.log('connected');
      client.on('message', (data) => this.onMessageReceive(data));
      // client.on('disconnect', () => onDisconnect());
    });
    
    io.listen(48765);
  }
}

module.exports = RemoteSocket;
