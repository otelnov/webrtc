module.exports = function (app) {
  'use strict';
  var config = app.get('config');

  // Tracer
  // log levels: log < trace < debug < info < warn < error
  var log = require('tracer').colorConsole({level: (config.LOG_LEVEL || 'info')});
  app.set('log', log);
};