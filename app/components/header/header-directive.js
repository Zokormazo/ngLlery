'use strict';

angular.module('myApp.header.header-directive', [])

.directive('siteHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/header/header.html'
    }
});