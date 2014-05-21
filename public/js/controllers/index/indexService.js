angular.module('webrtc.services')
  .service('IndexService',[
    '$resource',
    function($resource){
      "use strict";
      var Index = $resource('/index/:action', {}, {
//        get: { url: '/index', method: 'GET'}
      });

      var service = {
        records: function(cb){
//          Index.get(function(resp){
//            cb(resp.err, resp.data);
//          });
        }
      };
      return service;
    }
  ]);
