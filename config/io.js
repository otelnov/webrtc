module.exports = function(app, server){
  'use strict';
  var config = app.get('config');

  var log_level = config.SOCKET_IO_LOG_LEVEL || 1;
  var io = require('socket.io').listen(server);
  // *******************************
// Configure socket.io
// *******************************
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', log_level);// reduce logging: 0-error, 1-warn, 2-info, 3-debug
  io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile']);

  app.set('io', io);
};