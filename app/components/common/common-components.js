'use strict';

angular.module('myApp.common')

.component('alertBox', {
  templateUrl : 'components/common/partials/alert-box.html',
  controller: function(AlertService) {
    this.alerts = AlertService.getAlerts();

    this.closeAlert = function(index) {
      AlertService.deleteAlert(index);
    }
  }
});
