'use strict';

angular.module('myApp.webparts')

.directive('siteHeader', function() {
    return {
        restrict: 'E',
        controllerAs: 'header',
        templateUrl: 'components/webparts/partials/header.html'
    }
})

.directive('siteFooter', function() {
    return {
        restrict: 'E',
        controllerAs: 'footer',
        templateUrl: 'components/webparts/partials/footer.html'
    }
})

.directive('alertBox', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/webparts/partials/alert-box.html',
        controller: 'AlertBoxCtrl'
    }
})

.directive('alertBoxItem', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/webparts/partials/alert-box-item.html'
    }
}); 
