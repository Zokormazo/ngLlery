'use strict';

angular.module('myApp.common', [])

.constant('ALERT_TYPES', {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger'
})

.filter("jsDate", function () {
  return function (x) {
    if (x) {
      return new Date(x);
    }
    return '-';
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AlertInterceptor');
});
