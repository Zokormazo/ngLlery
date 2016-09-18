'use strict';

angular.module('myApp.dashboard')

.controller('DashboardCtrl', function($scope) {
})

.controller('DashboardSidebarCtrl', function($scope,$state) {
  $scope.$state = $state;
})

.controller('DashboardUsersStateCtrl', function($scope,$state,BackendService,AlertService, ALERT_TYPES) {
  $scope.newUserData = {};
  $scope.newUserRoles = {};
  $scope.searchTerm = '';
  $scope.orderByField = '';
  $scope.reverseSort = false;

  $scope.usersResource = BackendService.getDashboardUserResource();

  $scope.users = $scope.usersResource.query();

  $scope.addUser = function() {
    if ($scope.newUserForm.$dirty && $scope.newUserForm.$valid) {
      $scope.newUser = $scope.usersResource.save($scope.newUserData, function() {
        if ($scope.newUserRoles.admin) {
          BackendService.addRoleToUser($scope.newUser.id, 'admin');
          $scope.newUser.roles.push('admin');
        }
        if ($scope.newUserRoles.poweruser) {
          BackendService.addRoleToUser($scope.newUser.id, 'poweruser');
          $scope.newUser.roles.push('poweruser');
        }
        $scope.users.push($scope.newUser);
        $scope.newUserData = {};
        $scope.newUserRoles = {};
        AlertService.newAlert({
          'type': ALERT_TYPES.info,
          'message': 'User ' + $scope.newUser.username + ' successfully added.'
        });
      });
    }
  }
})

.controller('DashboardUsersListItemCtrl', function($scope, BackendService, AlertService, ALERT_TYPES) {
  $scope.showEditForm = false;

  $scope.roles = {
    'admin': $scope.user.roles.indexOf('admin') !== -1,
    'poweruser': $scope.user.roles.indexOf('poweruser') !== -1
  }

  $scope.deleteUser = function(index) {
    $scope.usersResource.delete({userId:$scope.user.id});
    $scope.users.splice(index, 1);
    AlertService.newAlert({
      'type': ALERT_TYPES.warning,
      'message': 'User ' + $scope.user.username + ' successfully deleted.'
    });
  };

  $scope.editUser = function() {
    if ($scope.editUserForm.$dirty && $scope.editUserForm.$valid) {
      $scope.usersResource.save({userId:$scope.user.id}, $scope.user);
      $scope.showEditForm = false;
      AlertService.newAlert({
        'type': ALERT_TYPES.info,
        'message': 'User ' + $scope.user.username + ' successfully edited.'
      });
    }
  };

  $scope.setPassword = function(password) {
    console.log('set password: ' + password)
  };

  $scope.toggleRole = function(role) {
    if (!$scope.roles[role]) {
      BackendService.delRoleToUser($scope.user.id,role);
      $scope.user.roles.splice($scope.user.roles.indexOf(role), 1);
    } else {
      BackendService.addRoleToUser($scope.user.id,role);
      $scope.user.roles.push(role);
    }
  };
});