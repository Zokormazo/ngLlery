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
})

.component('confirmationModal', {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'components/common/partials/confirmation-modal.html',
  controller: function() {
    let defaultSettings = {
      confirmButtonMessage: 'Accept',
      cancelButtonMessage: 'Cancel'
    }

    this.settings = angular.extend({}, defaultSettings, this.resolve.settings);
  }
});
