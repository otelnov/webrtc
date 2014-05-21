angular.module('webrtc.services').factory('socket', function(){
  var socket = io.connect('http://localhost:5555');
  return socket;
});