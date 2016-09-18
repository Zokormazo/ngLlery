'use strict';

angular.module('myApp')

.controller('ApplicationController', function($rootScope, $scope, USER_ROLES, AuthService, BackendService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.config = null;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

  $scope.setConfig = function(config) {
    $scope.config = config;
    $rootScope.config = config;
  }

  BackendService.loadConfig().then(function(config) {
    $scope.setConfig(config);
  });
});