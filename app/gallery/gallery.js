'use strict';

angular.module('myApp.gallery', ['myApp.backend'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('gallery', {
    url: '/gallery',
    templateUrl: 'gallery/partials/gallery.html',
    abstract: true,
    data: {
      authorizedRoles: [USER_ROLES.all]
    }
  })
  .state('gallery.index', {
    url: '',
    templateUrl: 'gallery/partials/index.html',
    controller: 'GalleryIndexCtrl'
  })
  .state('gallery.album', {
    url: '/gallery/album/:albumId',
    templateUrl: 'gallery/partials/album-view.html',
    controller: 'GalleryAlbumViewCtrl'
  });
})
