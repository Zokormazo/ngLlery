'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.common',
  'myApp.album'
]).
config(['$routeProvider', function($routeProvider) {
  // add default route
  $routeProvider.otherwise({redirectTo: '/album'});
}]);
