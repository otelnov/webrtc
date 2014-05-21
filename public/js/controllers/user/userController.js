angular.module('webrtc.controllers')
  .controller('UserController', [
    '$scope', '$routeParams', 'UserService',
    function ($scope, $routeParams, userService) {
      "use strict";

      userService.current(function(err, user){
        if (!user){
          $window.location.href = '/';
          return;
        }
        $scope.user = user;
      });

      function updateUserName() {
        if (!$scope.user){
          return;
        }
        userService.update($scope.user._id, {displayName: $scope.user.displayName},
          function (err, user) {

          });
      }

      $scope.$watch('user.displayName', updateUserName);

    }
  ]);
