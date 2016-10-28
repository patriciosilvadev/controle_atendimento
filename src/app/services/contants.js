(function () {
	'use strict';
	var contants= angular.module('constants',[])
	//.constant('ENDPOINT_URI', 'http://localhost:4000/api/')
	.constant('ENDPOINT_URI', 'http://localhost:4000/api/')
	.constant('DEV_MODE', true)
	.constant('SYNC_TIME', 120000)
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})
	.constant('USER_ROLES', {
		all: '*',
		atendente: 'atendente',
		administrador: 'administrador'
	});
})();