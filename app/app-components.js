'use strict';

angular.module('myApp')

.component('myApp', {
  template: '<ui-view></ui-view>',
  controller: function(BackendService, ConfigService, $state) {

    this.$onInit = function() {
      BackendService.getConfig().query(function(data) {
        ConfigService.setConfig(data.config);
      }, function(error) {
        $state.go('public.uops');
      });
    }
  }
});
