'use strict';

angular.module('myApp.common')

.factory('AlertService', function($timeout) {
  var alertService = {};

  alertService.alerts = [];

  alertService.newAlert = function(alert) {
    var newLength = alertService.alerts.push(alert);

    $timeout(function() {
      alertService.alerts.splice(0, 1);
    }, 3000);
  };

  alertService.get = function() {
    return alertService.alerts;
  }

  return alertService;
})

.factory('AlertInterceptor', function($q, AlertService, ALERT_TYPES) {
  var alertInterceptor = {
    responseError: function(error) {
      if (error.data.message)
        AlertService.newAlert({
          'type': ALERT_TYPES.danger,
          'message': error.data.message
        });
      return $q.reject(error);
    }
  };

  return alertInterceptor;
});