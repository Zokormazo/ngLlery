'use strict';

angular.module('myApp.members')

.controller('MembersCtrl', function($scope, BackendService) {
  $scope.userResource = BackendService.getUserResource();

  $scope.users = $scope.userResource.query();
});