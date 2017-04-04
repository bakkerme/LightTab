/**
 * Entrypoint to the comms server. Opens two sockets. LocalSocket connects to the plugin instance
 * running within Lightroom over a local socket. RemoteSocket uses socket.io to connect to the remote
 * controlling socket.
 */
"strict mode";
let LocalSocket = require('./local-socket.js');
let RemoteSocket = require('./remote-socket.js');
let HttpServer = require('./http-server');

console.log(LocalSocket, RemoteSocket);

let localSocket = new LocalSocket();
localSocket.openSocket();

let httpServer = new HttpServer();
httpServer.registerOnRequestRecieved((request, response) => relayMessageToRemoteSocket(request));
httpServer.startServer();

let remoteSocket = new RemoteSocket();
remoteSocket.registerOnMessageReceived((data) => relayMessageToLocalSocket(data))
remoteSocket.openSocket();

function relayMessageToLocalSocket(message) {
  localSocket.sendObject(message);
}

function relayMessageToRemoteSocket(message) {
  console.log('relaying to remote', message);
  remoteSocket.sendObject(message);
}