'use strict';

angular.module('myApp.backend')

.factory('BackendService', function($http, $resource, apiPrefix, AlertService, ALERT_TYPES) {
  var backendService = {};

  backendService.loadConfig = function() {
    return $http
      .get(apiPrefix + '/config')
      .then(function(res) {
        return res.data.config;
      }, function(res) {
        console.log('unable to load config')
      });
  };

  backendService.login = function(credentials) {
    return $http
      .post(apiPrefix + '/login', credentials)
  };

  backendService.register = function(user) {
    return $http
      .post(apiPrefix + '/register', user)
  };

  backendService.getTokenResource = function() {
    return $http
      .get(apiPrefix + '/token')
      .then(function(res) {
        return res.data;
      });
  }

  backendService.getDashboardUserResource = function(id) {
    return $resource(apiPrefix + '/dashboard/user/:userId', {userId: id});
  };

  backendService.addRoleToUser = function(id, role) {
    return $http
    .post(apiPrefix + '/dashboard/user/' + id + '/roles/' + role);
  };

    backendService.delRoleToUser = function(id, role) {
    return $http
    .delete(apiPrefix + '/dashboard/user/' + id + '/roles/' + role);
  };

  backendService.getUserResource = function(id) {
    return $resource(apiPrefix + '/user/:userId', {userId: id});
  };

  backendService.getAlbumResource = function(id) {
    return $resource(apiPrefix + '/album/:albumId', {albumId: id});
  }
  return backendService;
});