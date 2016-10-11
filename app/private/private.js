'use strict';

angular.module('myApp.private', ['myApp.backend', 'myApp.authentication', 'myApp.common', 'myApp.config' ])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('private', {
  	url: '/private',
    component: 'private',
  	abstract: true,
  	data: {
  	  authorizedRoles: [USER_ROLES.all]
  	}
  })
  .state('private.index', {
  	url: '',
  	component: 'privateIndex'
  })
  .state('private.albums', {
    url: '/private/albums',
    component: 'privateAlbumsPage',
    resolve: {
      albums: function(BackendService) {
        return BackendService.getAlbumResource().query();
      }
    }
  })
  .state('private.album', {
    url: '/private/albums/{albumId}',
    component: 'privateAlbumPage',
    resolve: {
      album: function(BackendService, $transition$) {
        return BackendService.getAlbumResource($transition$.params().albumId).get();
      },
      children: function(BackendService, $transition$) {
        return BackendService.getAlbumChildrenResource($transition$.params().albumId).query();
      },
      photos: function(BackendService, $transition$) {
        return BackendService.getAlbumPhotosResource($transition$.params().albumId).query();
      }
    }
  })
  .state('private.members', {
    url: '/private/members',
    component: 'privateMembersPage',
    resolve: {
      members: function(BackendService) {
        return BackendService.getUserResource().query();
      }
    }
  })
  .state('private.profile', {
    url: '/private/profile',
    component: 'privateProfilePage'
  });
})
