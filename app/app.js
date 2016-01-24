'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.album',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  // add default route
  $routeProvider.otherwise({redirectTo: '/album'});
}]);
