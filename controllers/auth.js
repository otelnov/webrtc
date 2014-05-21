var passport = require('passport');

module.exports = function (app) {
  'use strict';

  var config = app.get('config');

  app.get('/auth/google',
    passport.authenticate('google', { scope: config.GOOGLE_SCOPE }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/' }));


  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: config.FACEBOOK_SCOPE }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/error', successRedirect: '/' }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};