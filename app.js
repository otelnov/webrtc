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

// init controllers
require('./controllers')(app);