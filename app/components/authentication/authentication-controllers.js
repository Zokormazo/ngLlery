'use strict';

angular.module('myApp.authentication')

.controller('LoginPageCtrl', function($scope, $state, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      window.location = '#/index'
    }, function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})

.controller('SignPageCtrl', function($scope, $state, AuthService) {
  $scope.registration = {
    username: '',
    password: '',
    email: ''
  };

  $scope.check = {
    password: '',
    email: ''
  };

  $scope.register = function(user) {
    AuthService.register(user).then(function(user) {
      $state.go('login')      
    });
  };
})

.controller('AuthWarningsBoxCtrl', function($scope,AuthService) {
  $scope.error = AuthService.error;
  $scope.notice = AuthService.notice;
});