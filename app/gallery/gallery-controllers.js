'use strict';

angular.module('myApp.gallery')

.controller('GalleryIndexCtrl', function($scope, BackendService) {
  $scope.albums = BackendService.getAlbumResource().query();
  console.log($scope.albums);
})

.controller('GalleryAlbumViewCtrl', function($scope, BackendService, $stateParams) {
    $scope.album = BackendService.getAlbumResource($stateParams.albumId).get();
});