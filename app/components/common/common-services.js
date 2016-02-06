'use strict';

angular.module('myApp.common')

.factory('siteInfo', ['$resource', function($resource){
    return $resource('http://develbox.intranet.zokormazo.info:5000/api/site-info');
}]);