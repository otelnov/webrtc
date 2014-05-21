angular.module('webrtc.controllers')
  .controller('HeaderController', [
    '$scope', '$location', 'UserService',
    function ($scope, $location, userService) {
      "use strict";

      userService.current(function (err, user) {
        if (!user) {
          $window.location.href = '/';
          return;
        }
        $scope.user = user;
      });

      $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "active"
        } else {
          return ""
        }
      }

    }
  ]);
