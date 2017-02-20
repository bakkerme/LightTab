"strict mode";
let _ = require('lodash');
let net = require('net');

let pluginPort = 48763;
let host = '127.0.0.1';

if (typeof pluginPort !== 'number') {
	console.log(JSON.stringify(
		{
			status: 'error',
			message: 'Provided port is invalid'
		}
	));
}


let client = new net.Socket();
client.connect(pluginPort, host, function () {
	console.log('CONNECTED TO: ' + host + ':' + pluginPort);
	let value = {
		param: 'Tint',
		value: 100
	};

	client.write(JSON.stringify(value) + '\n');
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function (data) {
	console.log('DATA: ' + data);
	// Close the client socket completely
	client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
	console.log('Connection closed');
});
