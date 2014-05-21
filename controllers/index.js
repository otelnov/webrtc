var _ = require('underscore');

module.exports = function (app, server) {
  'use strict';

  app.all('/', function (req, res, next) {
    if (!req.user){
      res.render('login');
    } else {

      var io = require('socket.io').listen(server);
      io.sockets.on('connection', function (socket) {
        socket.on('send mess', function(data){
          io.sockets.emit('get mess', data);
        });
      });

      res.render('index');
    }
  });

  require('./auth')(app);
  require('./user')(app);

};