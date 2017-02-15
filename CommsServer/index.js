"strict mode";

var net = require('net');

var pluginPort = 48763;
var host = '127.0.0.1';

if(typeof pluginPort !== 'number') {
	console.log(JSON.stringify(
		{
			status: 'error',
			message: 'Provided port is invalid'
		}
	));
}


var client = new net.Socket();
client.connect(pluginPort, host, function() {
    console.log('CONNECTED TO: ' + host + ':' + pluginPort);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
		for(var i=0; i < 10; i++) {
			console.log('Writing!!!');
	    client.write(
				'Valid Connection!\n'
	    );
		}
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
