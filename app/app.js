'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.authentication',
  'myApp.backend',
  'myApp.common',
  'myApp.dashboard',
  'myApp.gallery',
  'myApp.members',
  'myApp.webparts'
])

.constant('apiPrefix', 'http://localhost:5000/api')
.constant('imagePrefix', 'http://localhost:5000/images')

.config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/index');
})

.config(function($urlRouterProvider) {
    $urlRouterProvider.when('/index', '/gallery');
})

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
});
