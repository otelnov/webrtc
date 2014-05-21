angular.module('webrtc.services')
  .service('FunctionsService',[
    function(){
      "use strict";

      var service = {
        closeMenu: function(){
          $('div.navbar-collapse').removeClass('in');
          $('div.navbar-collapse').addClass('collapsing');
          $('div.navbar-collapse').addClass('collapse');
          $('div.navbar-toggle').addClass('collapsed');
        }
      };
      return service;
    }
  ]);