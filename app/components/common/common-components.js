'use strict';

angular.module('myApp.common')

.component('alertBox', {
  templateUrl : 'components/common/partials/alert-box.html',
  controller: function(AlertService) {
    this.alerts = AlertService.get();
  }
})

.component('alertBoxItem', {
  bindings: {
    alert: '<'
  },
  templateUrl : 'components/common/partials/alert-box-item.html'
});
