var socket = require('socket.io-client')('http://localhost:48765');
socket.on('connect', function () {
  socket.emit('message', {
      param: 'Tint',
      value: 90
  })
});
socket.on('message', function (data) {
  console.log(data);
});
socket.on('event', function (data) {
  console.log(data);
});
socket.on('disconnect', function () {
  console.log('disconnect')
});