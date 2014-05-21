var _ = require('underscore'),
  mongoose = require('mongoose'),

  Users = mongoose.model('Users');

module.exports = function (app) {
  'use strict';

  app.get('/user', function (req, res) {
    var err;
    return res.json({success: !err, error: err, data: req.user});
  });


  app.put('/user/:userId', function (req, res) {
    var user;

    var id = req.params.userId;
    if (!id) {
      return res.json({ success: false, data: {}, error: "id is not defined" });
    }

    user = _.extend(_.pick(req.body, _.keys(Users.schema.paths)), {
      updatedAt: Date.now()
    });

    Users.findOneAndUpdate({_id: id}, user, function (err, data) {
      res.json({ success: !err, data: data, error: err });
    });

  }); // update user
};