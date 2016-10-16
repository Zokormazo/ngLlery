'use strict';

angular.module('myApp.private', ['myApp.backend', 'myApp.authentication', 'myApp.common', 'myApp.config', 'ui.bootstrap', 'ui.router' ])

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
    url: '/albums',
    component: 'privateAlbumsPage',
    resolve: {
      albums: function(BackendService) {
        return BackendService.getAlbumResource().query();
      }
    }
  })
  .state('private.album', {
    url: '/albums/{albumId}',
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
  .state('private.photo', {
    url: '/albums/{albumId}/photos/{photoId}',
    onEnter: function($state, $uibModal, $transition$, BackendService) {
      $uibModal.open({
        component: 'privatePhotoModal',
        size: 'lg',
        resolve: {
          photo: function() {
            return BackendService.getPhotoResource($transition$.params().photoId).get();
          }
        },
        windowClass: 'private-photo-modal'
      }).result.finally(function() {
        $state.go('private.album', {albumId: $transition$.params().albumId});
      })
    }
  })
  .state('private.members', {
    url: '/members',
    component: 'privateMembersPage',
    resolve: {
      members: function(BackendService) {
        return BackendService.getUserResource().query();
      }
    }
  })
  .state('private.member', {
    url: '/members/{memberId}',
    onEnter: function($state, $uibModal, $transition$, BackendService) {
      $uibModal.open({
        component: 'privateMemberModal',
        resolve: {
          member: function() {
            return BackendService.getUserResource($transition$.params().memberId).get();
          }
        },
        windowClass: 'private-member-modal'
      }).result.finally(function() {
        $state.go('private.members');
      })
    }
  })
  .state('private.profile', {
    url: '/profile',
    component: 'privateProfilePage',
    resolve: {
      profile: function(BackendService) {
        return BackendService.getProfileResource().query();
      }
    }
  });
})
