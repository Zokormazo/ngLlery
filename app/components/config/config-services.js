'use strict';

angular.module('myApp.config')

.factory('ConfigService', function() {
  var configService = {};

  configService.config = null;

  configService.setConfig = function(config) {
    configService.config = config;
  }

  return configService;
})