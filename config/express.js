var express = require('express');
var passport = require('passport');
var _ = require('underscore');

module.exports = function (app) {
  'use strict';
  var config = app.get('config');
  var log = app.get('log');

  // Session Storage
  var MongoStore = require('connect-mongo')(express);
  var sessionStore = new MongoStore({
    url: config.MONGODB_URL,
    auto_reconnect: true });

  var passwordHash = require('password-hash');
  app.set('passwordHash', passwordHash);

  app.set('view engine', 'ejs');
  app.set('views',__dirname+'/../public');

// express logger setup
  app.configure('development', function () {
    app.use(express.logger('dev'));
  });

  app.configure('staging', function () {
    app.use(express.logger('tiny'));
  });

  app.configure('production', function () {
    app.use(express.logger());
  });

  app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use('/bower_components', express.static(__dirname + '/../bower_components'));
    app.use('/', express.static(__dirname + '/../public'));

    app.use(express.session({ secret: config.SESSION_SECRET, store: sessionStore }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
  });
};
