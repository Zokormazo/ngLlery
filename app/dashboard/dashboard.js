'use strict';

angular.module('myApp.dashboard', ['myApp.backend', 'myApp.common']) 

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'dashboard/partials/dashboard.html',
    controller: 'DashboardCtrl',
    abstract: true,
    data: {
        authorizedRoles: [USER_ROLES.admin]
    }
  })
  .state('dashboard.overview', {
    url: '',
    templateUrl: 'dashboard/partials/overview.html'
  })
  .state('dashboard.users', {
    templateUrl: 'dashboard/partials/users.html',
    controller: 'DashboardUsersStateCtrl'
  });
})