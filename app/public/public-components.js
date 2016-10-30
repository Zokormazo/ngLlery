'use strict';

angular.module('myApp.public')

.component('publicIndex', {
  template: `
    <public-header></public-header>
    <alert-box class="public-alert-box"></alert-box>
    <ui-view></ui-view>
    <footer class="public-footer">
      <p>ngLlery</p>
    </footer>
    `
})

.component('publicHeader', {
  templateUrl: 'public/partials/header.html',
  controller: function(ConfigService) {
    this.config = ConfigService.config;
  }
})

.component('logged', {
  templateUrl: 'public/partials/logged.html',
  controller: function($rootScope) {
    this.currentUser = $rootScope.currentUser;
  }
})

.component('publicLogin', {
  templateUrl: 'public/partials/login-page.html',
  controller: function($rootScope, AUTH_EVENTS, AuthService, ConfigService) {
    this.config = ConfigService.config;

    this.currentUser = AuthService.getCurrentUser();

    this.credentials = {
      username: '',
      password: ''
    };

    this.loading = false;

    this.login = function(credentials) {
      this.loading = true;
      AuthService.login(credentials).then(angular.bind(this, function(user) {
        this.loading = false;
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        window.location = '#/index';
      }), angular.bind(this, function() {
        this.loading = false;
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }));
    };
  }
})

.component('publicRegister', {
  templateUrl: 'public/partials/register-page.html',
  controller: function($rootScope, AuthService, ConfigService) {
    this.config = ConfigService.config;

    this.currentUser = $rootScope.currentUser;

    this.registration = {
      username: '',
      password: '',
      email: ''
    };

    this.check = {
      password: '',
      email: ''
    };

    this.loading = false;

    this.register = function(user) {
      this.loading = true;
      AuthService.register(user).then(angular.bind(this, function(user) {
        this.loading = false;
        window.location = '#/index';
      }), angular.bind(this, function() {
        this.loading = false;
      }));
    };
  }
})

.component('publicUops', {
  templateUrl: 'public/partials/uops-page.html'
});
