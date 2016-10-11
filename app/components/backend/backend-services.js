'use strict';

angular.module('myApp.backend')

/*
Backend interaction Service.
*/
.factory('BackendService', function($http, $resource, apiPrefix, AlertService, ALERT_TYPES) {
  var backendService = {};

  /*
  Site Config related resources
  */
  /*backendService.loadConfig = function() {
    return $http
      .get(apiPrefix + '/config')
      .then(function(res) {
        return res.data.config;
      }, function(res) {
        console.log('unable to load config')
      });
  };*/
  backendService.getConfig = function() {
    return $resource(apiPrefix + '/config', null, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  };

  /*
  User authentication and registration related resources
  */
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
  };

  /*
  User profiles related resources
  */
  backendService.getUserResource = function(id) {
    return $resource(apiPrefix + '/users/:userId', {userId: id});
  };

  /*
  Gallery related resources
  */
  backendService.getAlbumResource = function(id) {
    return $resource(apiPrefix + '/albums/:albumId', {albumId: id});
  };

  backendService.getAlbumChildrenResource = function(id) {
    return $resource(apiPrefix + '/albums/:albumId/children', {albumId: id});
  };

  backendService.getAlbumPhotosResource = function(id) {
    return $resource(apiPrefix + '/albums/:albumId/photos', {albumId: id});
  };

  backendService.getPhotoResource = function(id) {
    return $resource(apiPrefix + '/photos/:photoId', {photoId: id})
  };

  /*
  Dashboard related resources
  */

  /*
  Dashboard user management resources
  */
  backendService.getDashboardUserResource = function(id) {
    return $resource(apiPrefix + '/dashboard/users/:userId', {userId: id});
  };

  backendService.addRoleToUser = function(id, role) {
    return $http
    .post(apiPrefix + '/dashboard/users/' + id + '/roles/' + role);
  };

  backendService.delRoleToUser = function(id, role) {
    return $http
    .delete(apiPrefix + '/dashboard/users/' + id + '/roles/' + role);
  };

  /*
  Dashboard gallery management resources
  */

  backendService.getDashboardAlbumResource = function(id) {
    return $resource(apiPrex + '/dashboard/albums/:albumId', {albumId: id});
  };

  backendService.getDashboardAlbumChildrenResource = function(id) {
    return $resource(apiPrefix = '/dashboard/albums/:albumId/children', {albumId : id});
  };

  backendService.getDashboardAlbumPhotosResource = function(id) {
    return $resource(apiPrefix + '/dashboard/albums/:albumId/photos', {albumId: id});
  };

  backendService.getDashboardPhotoResource = function(id) {
    return $resource(apiPrefix + '/dashboard/photos/:photoId', {photoId: id});
  }

  return backendService;
});