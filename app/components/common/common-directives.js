'use strict';

angular.module('myApp.common')

.directive('siteHeader', function() {
    return {
        restrict: 'E',
        controller: 'HeaderCtrl',
        controllerAs: 'header',
        templateUrl: 'components/common/partials/header.html'
    }
})

.directive('siteFooter', function() {
    return {
        restrict: 'E',
        controller: 'FooterCtrl',
        controllerAs: 'footer',
        templateUrl: 'components/common/partials/footer.html'
    }
});