'use strict';

angular.module('myApp.gallery')

.directive('galleryBreadcrumb', function() {
  return {
    restrict: 'E',
    templateUrl: 'gallery/partials/breadcrumb.html'
  }
})

.directive('galleryAlbumItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'gallery/partials/album-item.html'
  }
});