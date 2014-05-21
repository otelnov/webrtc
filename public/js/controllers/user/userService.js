angular.module('webrtc.services')
  .service('UserService',[
    '$resource',
    function($resource){
      "use strict";
      var UserResource = $resource('/user/:action', {}, {
        update: { url: '/user/:userId', method: 'PUT'}
      });

      var service = {
        current: function(cb){
          UserResource.get({action: ''}, function(resp){
            cb(resp.err, resp.data);
          });
        },
        update: function (id, user, cb) {
          UserResource.update({userId: id}, user, function (resp) {
            cb(resp.error, resp.data);
          });
        }
      };
      return service;
    }
  ]);
