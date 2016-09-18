'use strict';

angular.module('myApp.authentication')

.factory('AuthService', function($rootScope, $http, $interval, apiPrefix, USER_ROLES, Session, BackendService, AlertService, ALERT_TYPES){
  var authService = {};

  authService.login = function(credentials) {
    return BackendService.login(credentials)
      .then(function(res) {
        Session.create(res.data.user.id, res.data.user.roles, res.data.token);
        authService.stopRefreshToken = $interval(authService.refreshToken, $rootScope.config.auth.tokenExpirationTime*1000 - 30000);
        AlertService.newAlert({
          'type': ALERT_TYPES.success,
          'message': 'Successfully logged'
        });
        return res.data.user;
      });
  };

  authService.logout = function() {
    $interval.cancel(authService.stopRefreshToken);
    AlertService.newAlert({
      'type': ALERT_TYPES.success,
      'message': 'Successfully logged out'
    });
    Session.destroy();
  };

  authService.register = function(user) {
    return BackendService.register(user)
      .then(function(res) {
        AlertService.newAlert({
          'type': ALERT_TYPES.success,
          'message': 'Successfully registered'
        });
        return true;
      }, function(res) {
      });
  };

  authService.refreshToken = function() {
    return BackendService.getTokenResource()
      .then(function(res) {
        Session.setToken(res.token);
      });
  }; 

  authService.isAuthenticated = function() {
    return !!Session.userId;
  };

  authService.isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    if (!authService.isAuthenticated())
      return false
    for(var role in Session.userRoles) {
      if (authorizedRoles.indexOf(role))
        return true
    }
    return (authorizedRoles.indexOf(USER_ROLES.all) !== -1);
  };

  return authService;
})

.service('Session', function($http) {
  this.create = function(userId, userRoles, userToken) {
    this.userId = userId;
    this.userRoles = userRoles;
    $http.defaults.headers.common['Authorization'] = userToken;
  };

  this.destroy = function() {
    this.userId = null;
    this.userRoles = [];
    $http.defaults.headers.common['Authorization'] = '';
  };

  this.setToken = function(token) {
    $http.defaults.headers.common['Authorization'] = token;
  }
})

.factory('AuthInterceptor', function ($q) {
  var authInterceptor = {
    responseError: function(error) {
      if (error.status == 401) {
        window.location = '#/logout';
      }
      if (error.status == 403) {
        window.location = '#/index';
      }
      return $q.reject(error);
    }
  };
  return authInterceptor;
})