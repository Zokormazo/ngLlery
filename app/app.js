'use strict';

angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'myApp.authentication',
  'myApp.backend',
  'myApp.config',
  'myApp.common',
  'myApp.public',
  'myApp.private',
])

.constant('apiPrefix', 'http://localhost:5000/api')
.constant('imagePrefix', 'http://localhost:5000/images')

.config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/index');
})

.config(function($urlRouterProvider) {
    $urlRouterProvider.when('/index', '/private');
})

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
})

.config(function($httpProvider) {
  $httpProvider.useApplyAsync(true);
});
