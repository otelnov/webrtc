angular.module('webrtc.controllers', []);
angular.module('webrtc.services', []);
angular.module('webrtc.filters', []);

angular.module('webrtc', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'webrtc.controllers',
    'webrtc.services',
    "click"
  ]).
  config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      'use strict';
      $locationProvider.html5Mode(false);
      $routeProvider
        .when('/', {
          templateUrl: '/html/index.html',
          controller: 'IndexController'
        })
        .otherwise({redirectTo: '/'});
    }])
  .run(['NavigationService', function(navService){
    'use strict';
  }]);
