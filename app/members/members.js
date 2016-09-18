'use strict';

angular.module('myApp.members', ['myApp.backend'])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('members', {
    url: '/members',
    templateUrl: 'members/partials/members.html',
    controller: 'MembersCtrl',
    data: {
        authorizedRoles: [USER_ROLES.all]
    }
  });
})