'use strict';

angular.module('myApp.authentication')

.factory('AuthService', function($http, $interval, USER_ROLES, Session, BackendService, ConfigService, AlertService, ALERT_TYPES){

  let authService = {};

  authService.login = function(credentials) {
    return BackendService.login(credentials)
      .then(function(res) {
        Session.create(res.data.user, res.data.token);
        authService.stopRefreshToken = $interval(authService.refreshToken, ConfigService.config.auth.tokenExpirationTime*1000 - 30000);
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
    return !!Session.user;
  };

  authService.isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    if (!authService.isAuthenticated())
      return false
    for(let role in Session.user.roles) {
      if (authorizedRoles.indexOf(role))
        return true
    }
    return (authorizedRoles.indexOf(USER_ROLES.all) !== -1);
  };

  authService.getCurrentUser = function() {
    return Session.user;
  }

  return authService;
})

.service('Session', function($http) {
  this.user = null;

  this.create = function(user, token) {
    this.user = user;
    $http.defaults.headers.common['Authorization'] = token;
  };

  this.destroy = function() {
    this.user = null;
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
