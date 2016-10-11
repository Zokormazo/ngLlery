'use strict';

angular.module('myApp')

.component('myApp', {
  template: '<ui-view></ui-view>',
  controller: function($rootScope, $state, USER_ROLES, AuthService, BackendService, ConfigService) {
    $rootScope.currentUser = null;
    $rootScope.userRoles = USER_ROLES;
    $rootScope.isAuthorized = AuthService.isAuthorized;

    $rootScope.setCurrentUser = function(user) {
      $rootScope.currentUser = user;
    };

    this.$onInit = function() {
      BackendService.getConfig().query(function(data) {
        ConfigService.setConfig(data.config);
      }, function(error) {
        $state.go('public.uops');
      });
    }
  }
});
