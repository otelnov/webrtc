var _ = require('underscore');
var async = require('async');
//var moment = require('moment');
var fs = require('fs');

// Passport authentication
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {
  'use strict';
  var config = app.get('config');
  var log = app.get('log');

  var mongoose = require('mongoose');
  var Users = mongoose.model('Users');

  function findUserById(id, cb) {
    Users.findOne({
      _id: id
    }, function (err, user) {
      cb(err, user);
    });
  }

  // serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    findUserById(id, function (err, user) {
      done(err, user);
    });
  });

  // use google strategy
  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
  }, function (accessToken, refreshToken, profile, done) {
    Users.findOne({
      $or: [
        {
          'providerId': profile._json.id
        },
        {
          'email': profile._json.email
        }
      ]
    }, function (err, user) {
      // user not found -> create new
      if (!user) {
        user = new Users({
          name: profile._json.given_name,
          surname: profile._json.family_name,
          displayName: profile._json.name,
          email: profile._json.email,
          picture: profile._json.picture,
          provider: 'google',
          providerId: profile._json.id
        });
        user.save();
        return done(err, user);
      } else {
        return done(err, user);
      }
    });
  }));

  // use facebook strategy
  passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: config.FACEBOOK_CALLBACK_URL,
    profileURL: 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,picture,email'
  }, function (accessToken, refreshToken, profile, done) {
    Users.findOne({
      $or: [
        {
          'providerId': profile._json.id
        },
        {
          'email': profile._json.email
        }
      ]
    }, function (err, user) {
      // user not found -> create new
      if (!user) {
        user = new Users({
          name: profile._json.first_name,
          surname: profile._json.last_name,
          displayName: profile._json.name,
          email: profile._json.email,
          picture: profile._json.picture.data.url,
          provider: profile.provider,
          providerId: profile._json.id
        });
        user.save();
        return done(err, user);
      } else {
        return done(err, user);
      }
    });
  }));


};