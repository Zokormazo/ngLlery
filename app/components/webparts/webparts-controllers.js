'use strict';

angular.module('myApp.webparts')

.controller('AlertBoxCtrl', function($scope, AlertService) {
  $scope.alerts = AlertService.get();
});