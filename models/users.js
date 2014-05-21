var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(app){
  'use strict';

  var UsersSchema = new Schema({
    "name": String,
    "surname": String,
    "displayName": String,
    "picture": String,
    "email": {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    "createdAt": {
      type: Date,
      "default": Date.now
    },
    "updatedAt": {
      type: Date,
      "default": Date.now
    },
    "provider": {
      type: String,
      required: true,
      "default": "local"
    },
    "providerId": {
      type: String
    },
    "isEnabled": {
      type: Boolean,
      "default": true
    }
  });

  mongoose.model('Users', UsersSchema, 'Users');
};






