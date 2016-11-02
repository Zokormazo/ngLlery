'use strict';

angular.module('myApp.common')

.component('alertBox', {
  templateUrl: 'components/common/partials/alert-box.html',
  controller: function(AlertService) {
    this.alerts = AlertService.getAlerts();

    this.closeAlert = function(index) {
      AlertService.deleteAlert(index);
    }
  }
})

.component('actionBar', {
  bindings: {
    searchModel: '=',
    actions: '<'
  },
  templateUrl: 'components/common/partials/action-bar.html',
  controller: function() {
    if (angular.isDefined(this.searchModel)) {
      this.search = true;
    }
    if (!angular.isDefined(this.actions)) {
      this.actions = [];
    }
    this.isSearchCollapsed = true;

    this.toggleSearch = function() {
      this.isSearchCollapsed = !this.isSearchCollapsed;
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
