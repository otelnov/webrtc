var _ = require('underscore');

module.exports = function (app) {
  'use strict';

  var io = app.get('io');
  io.sockets.on('connection', function (socket) {
    socket.on('send mess', function(data){
      io.sockets.emit('get mess', data);
    });
  });

  app.all('/', function (req, res, next) {
    if (!req.user){
      res.render('login');
    } else {
      res.render('index');
    }
  });

  require('./auth')(app);
  require('./user')(app);

};