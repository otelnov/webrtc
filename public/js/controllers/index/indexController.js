angular.module('webrtc.controllers')
.controller('IndexController',[
    '$scope', '$window', '$routeParams', '$location', 'IndexService', 'FunctionsService', 'socket',
    function($scope, $window, $routeParams, $location, indexService, functionsService, socket){
      "use strict";

      $scope.mess = [];

      $scope.sendMess = function() {
        socket.emit('send mess', $scope.mess.text);
        $scope.mess.text = '';
      }

//      socket.on('get mess', function(data){
//        $scope.mess.push(data);
//        $scope.$digest();
//      })


    }
  ]);
