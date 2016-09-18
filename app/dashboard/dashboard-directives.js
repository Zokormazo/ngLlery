'use strict';

angular.module('myApp.dashboard')

.directive('dashboardSidebar', function() {
  return {
    restrict: 'E',
    templateUrl: 'dashboard/partials/sidebar.html',
    controller: 'DashboardSidebarCtrl'
  }
})

.directive('dashboardUsersListItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'dashboard/partials/users-list-item.html',
    controller: 'DashboardUsersListItemCtrl'
  }
})