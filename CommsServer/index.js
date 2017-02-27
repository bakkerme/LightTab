/**
 * Entrypoint to the comms server. Opens two sockets. LocalSocket connects to the plugin instance
 * running within Lightroom over a local socket. RemoteSocket uses socket.io to connect to the remote
 * controlling socket.
 */
"strict mode";
let LocalSocket = require('./local-socket.js');
let RemoteSocket = require('./remote-socket.js');

console.log(LocalSocket, RemoteSocket);

let localSocket = new LocalSocket();
let remoteSocket = new RemoteSocket();

// localSocket.openSocket();
remoteSocket.openSocket();