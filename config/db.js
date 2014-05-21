module.exports = function (app) {
  'use strict';

  var config = app.get('config');

  var mongoose = require('mongoose');
  mongoose.connect(config.MONGODB_URL, {server:{auto_reconnect:true}});
  if (config.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }
};