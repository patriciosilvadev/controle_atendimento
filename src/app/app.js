'use strict';

var app = angular.module('BlurAdmin', [
  'constants',
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $state,AuthService) {
    var user = {
          username:"vlima",
          password:"Windows8-19"
  };
  AuthService.login(user).then(function(){
    console.log("funcionou");
  });
  $rootScope.$on('$stateChangeStart', function(event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    console.log(!AuthService.isAuthorized(authorizedRoles));
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      alert("Você não tem permissão para acessar este item!")
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        //$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        //$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
});