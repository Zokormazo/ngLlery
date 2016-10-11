'use strict';

angular.module('myApp.public', ['ngMessages', 'myApp.authentication', 'myApp.config', 'myApp.common' ])

.config(function($stateProvider, USER_ROLES) {
  $stateProvider.state('public', {
    url: '/public',
    component: 'publicIndex',
    abstract: true,
  })
  .state('public.login', {
    url: '/login',
    component: 'publicLogin',
    data: {
      public: true
    }
  })
  .state('public.register', {
    url: '/register',
    component: 'publicRegister',
    data: {
      public: true
    }
  })
  .state('public.uops', {
    url: '/uops',
    component: 'publicUops',
    data: {
      public: true
    }
  });
})
