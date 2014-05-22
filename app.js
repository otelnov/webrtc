var express = require('express');
var app = module.exports = express();

// models for mongoose
require('./models')(app);

// configuration
require('./config')(app);

// init services
require('./services').init(app);

// start server
var config = app.get('config');

var port = config.PORT || 5555;
var server = app.listen(port, function(){
  'use strict';
  console.log("\nExpress server listening on port %d in %s mode", port, app.settings.env);
});

var io = require('socket.io').listen(server);
var easyrtc = require("easyrtc");
app.set('io', io);
var easyrtcServer = easyrtc.listen(app, io);

// init controllers
require('./controllers')(app,server);