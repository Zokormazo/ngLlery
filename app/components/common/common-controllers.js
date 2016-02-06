'use strict';

angular.module('myApp.common')

.controller('HeaderCtrl', function(siteInfo) {
    var self = this;

    self.siteInfo = siteInfo.get({},function() {
        console.log('get site-info')
    });
})

.controller('FooterCtrl', function(siteInfo) {
})