'use strict';

angular.module('myApp.authentication', ['ui.router', 'myApp.backend', 'myApp.common', 'myApp.config'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('logout', {
    url: '/logout',
    controller: function($rootScope, $state, AuthService, Session) {
      AuthService.logout();
      $rootScope.setCurrentUser(null);
      Session.destroy();
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
  $transitions.onStart({}, function($transition$) {
    let AuthService = $transition$.injector().get('AuthService');
    let AUTH_EVENTS = $transition$.injector().get('AUTH_EVENTS');
    let $rootScope = $transition$.injector().get('$rootScope');
    if (!$transition$.$to().data.public) {
      if (!AuthService.isAuthorized($transition$.$to().data.authorizedRoles)) {
        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
        return $transition$.router.stateService.target('public.login');
      }
    }
  })
});
