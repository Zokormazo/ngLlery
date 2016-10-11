'use strict';

angular.module('myApp.authentication', ['ui.router', 'myApp.backend', 'myApp.common', 'myApp.config'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('logout', {
    url: '/logout',
    controller: function($rootScope, $state, AuthService) {
      AuthService.logout();
      $rootScope.setCurrentUser(null);
      $state.go('public.login');
    },
    template: 'logout',
    data: {
      authorizedRoles: [USER_ROLES.all]
    }
  })
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.run(function($transitions) {
  $transitions.onStart({ to: 'private.**'}, function(trans) {
    var authService = trans.injector().get('AuthService');
    if (!authService.isAuthenticated()) {
      // User isn't authenticated, redirecto to login page
      return trans.router.stateService.target('public.login');
    }
  })
});
/*.run(function ($rootScope, $state, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (!next.data.public) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
        $state.go('public.login');
      }
    }
  })
});*/
