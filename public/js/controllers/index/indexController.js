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

      socket.on('get mess', function(data){
        $scope.mess.push(data);
        $scope.$digest();
      })

      connect();

      var selfEasyrtcid = "";

      function connect() {
        easyrtc.setRoomOccupantListener(convertListToButtons);
        easyrtc.easyApp("easyrtc.audioVideo", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
      }

      function clearConnectList() {
        var otherClientDiv = document.getElementById("otherClients");
        while (otherClientDiv.hasChildNodes()) {
          otherClientDiv.removeChild(otherClientDiv.lastChild);
        }
      }

      function convertListToButtons (roomName, data, isPrimary) {
        clearConnectList();
        var otherClientDiv = document.getElementById("otherClients");
        for(var easyrtcid in data) {
          var button = document.createElement("button");
          button.onclick = function(easyrtcid) {
            return function() {
              performCall(easyrtcid);
            };
          }(easyrtcid);

          var label = document.createTextNode(easyrtc.idToName(easyrtcid));
          button.appendChild(label);
          otherClientDiv.appendChild(button);
        }
      }

      function performCall(otherEasyrtcid) {
        easyrtc.hangupAll();

        var successCB = function() {};
        var failureCB = function() {};
        easyrtc.call(otherEasyrtcid, successCB, failureCB);
      }

      function loginSuccess(easyrtcid) {
        selfEasyrtcid = easyrtcid;
        document.getElementById("iam").innerHTML = "Connected as " + easyrtc.cleanId(easyrtcid);
      }

      function loginFailure(errorCode, message) {
        easyrtc.showError(errorCode, message);
      }

    }
  ]);
