'use strict';

angular.module('myApp.backend')

.directive('photoSrc', ['$http', 'imagePrefix', function($http,imagePrefix) {
  return {
    scope: {},
    link: function($scope, elem, attrs) {
            function revokeObjectURL() {
              if ($scope.objectURL) {
                URL.revokeObjectURL($scope.objectURL);
              }
            }

            $scope.$watch('objectURL', function(objectURL) {
              elem.attr('src', objectURL);
            });

            $scope.$on('$destroy', function() {
                revokeObjectURL();
            });

            attrs.$observe('photoSrc', function(id) {
              revokeObjectURL();

              if (id) {
                $http.get(imagePrefix + '/' + id + '/file', {
                  responseType: 'arraybuffer',
                  headers: {
                    'accept': 'image/webp,image/*,*/*;q=0.8'
                  }}).then(function (response) {
                             var blob = new Blob(
                               [response.data],
                               { type: response.headers('Content-type') }
                             );
                             $scope.objectURL = URL.createObjectURL(blob)
                });
              }
            });
          }
  }
}])

.directive('thumbnailSrc', ['$http', 'imagePrefix', function($http,imagePrefix) {
  return {
    scope: {
      thumbnailWidth: '<'
    },
    link: function($scope, elem, attrs) {
            function revokeObjectURL() {
              if ($scope.objectURL) {
                URL.revokeObjectURL($scope.objectURL);
              }
            }

            $scope.$watch('objectURL', function(objectURL) {
              elem.attr('src', objectURL);
            });

            $scope.$on('$destroy', function() {
                revokeObjectURL();
            });

            attrs.$observe('thumbnailSrc', function(id) {
              revokeObjectURL();

              if (id) {
                $http.get(imagePrefix + '/' + id + '/thumbnail/' + $scope.thumbnailWidth, {
                  responseType: 'arraybuffer',
                  headers: {
                    'accept': 'image/webp,image/*,*/*;q=0.8'
                  }}).then(function (response) {
                             var blob = new Blob(
                               [response.data],
                               { type: response.headers('Content-type') }
                             );
                             $scope.objectURL = URL.createObjectURL(blob)
                });
              }
            });
          }
  }
}]);
