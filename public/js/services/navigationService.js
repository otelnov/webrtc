angular.module('webrtc.services')
  .service('NavigationService',[
    '$window', '$location', '$rootScope',
    function($window, $location, $rootScope){
      "use strict";
      function _isMobile(){
        return $window.innerWidth < 501;
      }
      var isMobile = _isMobile();
      angular.element($window).bind('resize', function () {
        isMobile = _isMobile();
        $rootScope.$broadcast('isMobile', isMobile);
        if (!$rootScope.$root.$$phase){
          $rootScope.$apply();
        }
      });

      var service = {
        navBack: function(){
          $window.history.back();
        },
        navTo: function(url){
          $location.url(url.replace('#',''));
        },
        setTitle: function(title){
          $rootScope.title = title;
        },
        setPlus: function(fnc){
          $rootScope.headerPlusButton = fnc;
        },
        isMobile: function(cb){
          cb(isMobile);
          $rootScope.$on('isMobile', function(event, isMobile){cb(isMobile);});
        }
      };
      $rootScope.navBack = service.navBack;
      $rootScope.navTo = service.navTo;
      $rootScope.setTitle = service.setTitle;
      $rootScope.setPlus = service.setPlus;
      return service;
    }
  ]);