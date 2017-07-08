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

app.config(function ($httpProvider, $logProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
	$logProvider.debugEnabled(true);
});

app.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

app.run(function($rootScope, $state,AuthService,$window,$log) {
	Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

	var date = new Date();
	var weekNumber = date.getWeek();
	$log.info("Week number "+weekNumber);
	$log.info(date);

	AuthService.login().then(function(){
		console.log("funcionou");
	},function(erro){
		//$window.location.href = '/auth.html';
		window.location.href = '/auth.html';
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