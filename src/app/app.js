'use strict';

var app = angular.module('BlurAdmin', [
  'constants',
  'ngAnimate',
  'LocalStorageModule',
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
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function($rootScope, $state,AuthService,$window) {
  AuthService.login().then(function(){
    console.log("funcionou");
  },function(erro){
    $window.location.href = '/auth.html';
  });
  $rootScope.$on('$stateChangeStart', function(event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (AuthService.isAuthenticated() && !AuthService.isAuthorized(authorizedRoles)) {
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