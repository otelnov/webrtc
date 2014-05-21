'use strict';

angular.module('click', [])
  .directive('click', function($document){
    return {
      restrict: 'A',
      link: function(scope, elem, attr, ctrl) {
        var any = true;
        $(elem).on('click touchstart', function(e){
          any = false;
        });
        $($document).on('click touchstart', function(){
          if(any) {
            $('div.navbar-collapse').removeClass('in');
            $('div.navbar-collapse').addClass('collapsing');
            $('div.navbar-collapse').addClass('collapse');
            $('div.navbar-toggle').addClass('collapsed');
          }
          any = true;
        });
      }
    };
  });