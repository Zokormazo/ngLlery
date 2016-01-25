'use strict';

angular.module('myApp.footer.footer-directive', ['myApp.version'])

.directive('siteFooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/footer/footer.html'
    }
});