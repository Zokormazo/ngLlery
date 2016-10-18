'use strict';

angular.module('myApp.common')

.factory('AlertService', function($timeout) {
  var alertService = {};

  alertService.alerts = [];

  alertService.newAlert = function(alert) {
    alertService.alerts.push(alert);
  };

  alertService.deleteAlert = function(index) {
    alertService.alerts.splice(index, 1);
  }

  alertService.getAlerts = function() {
    return alertService.alerts;
  }

  return alertService;
})

.factory('AlertInterceptor', function($q, AlertService, ALERT_TYPES) {
  var alertInterceptor = {
    responseError: function(error) {
      if (error.data && error.data.message)
        AlertService.newAlert({
          'type': ALERT_TYPES.danger,
          'message': error.data.message
        });
      return $q.reject(error);
    }
  };

  return alertInterceptor;
})

.factory('ConfirmationModalService', function($uibModal) {
  var confirmationModalService = {
    open: function(settings) {
      return $uibModal.open({
				backdrop: false,
				keyboard: true,
				size: 'sm',
				component: 'confirmationModal',
				resolve: {
					settings: settings
				}
			});
    }
  };

  return confirmationModalService;
});
