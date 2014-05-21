var _ = require('underscore');

module.exports = function (app) {
  'use strict';

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