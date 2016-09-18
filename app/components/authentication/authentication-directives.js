'use strict';

angular.module('myApp.authentication')

.directive('authWarningsBox', function() {
  return {
    restrict: 'E',
    controller: 'AuthWarningsBoxCtrl',
    templateUrl: 'components/authentication/partials/warnings-box.html'
  }
});