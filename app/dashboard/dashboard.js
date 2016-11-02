'use strict';

angular.module('myApp.dashboard', ['ui.bootstrap', 'ui.router'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    component: 'dashboard',
    abstract: true,
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  .state('dashboard.index', {
    url: '',
    component: 'dashboardIndex'
  })
  .state('dashboard.users', {
    url: '/users',
    component: 'dashboardUsersPage',
    resolve: {
      users: function(BackendService) {
        return BackendService.getDashboardUserResource().query();
      }
    }
  })
  .state('dashboard.albums', {
    url: '/albums',
    component: 'dashboardAlbumsPage',
    resolve: {
      albums: function(BackendService) {
        return BackendService.getDashboardAlbumResource().query();
      }
    }
  })
  .state('dashboard.album', {
    url: '/albums/{albumId}',
    component: 'dashboardAlbumPage',
    resolve: {
      album: function(BackendService, $transition$) {
        return BackendService.getDashboardAlbumResource($transition$.params().albumId).get();
      },
      children: function(BackendService, $transition$) {
        return BackendService.getDashboardAlbumChildrenResource($transition$.params().albumId).query();
      },
      photos: function(BackendService, $transition$) {
        return BackendService.getDashboardAlbumPhotosResource($transition$.params().albumId).query();
      }
    }
  })
  .state('dashboard.photo', {
    url: '/photos/{photoId}',
    component: 'dashboardPhotoPage',
    resolve: {
      photo: function(BackendService, $transition$) {
        return BackendService.getDashboardPhotoResource($transition$.params().photoId).get();
      }
    }
  });
});
