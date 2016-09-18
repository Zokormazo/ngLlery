'use strict';

angular.module('myApp.authentication', ['ui.router', 'myApp.backend', 'myApp.common'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'components/authentication/partials/login-page.html',
    controller: 'LoginPageCtrl',
    data: {
      public: true
    }
  })
  .state('sign', {
    url: '/sign',
    templateUrl: 'components/authentication/partials/sign-page.html',
    data: {
      public: true
    }
  })
  .state('logout', {
    url: '/logout',
    controller: function($scope,Session,$state,AuthService) {
      AuthService.logout();
      $scope.setCurrentUser(null);
      $state.go('login')
    },
    data: {
      authorizedRoles: [USER_ROLES.all]
    }
  })
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.run(function ($rootScope, $state, AUTH_EVENTS, AuthService) {
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
        $state.go('login');
      }
    }
  })
});