(function () {
	'use strict';
	var contants= angular.module('constants',[])
	.constant('ENDPOINT_API', 'http://localhost:4000/api/')
	//.constant('ENDPOINT_API', 'http://187.3.39.80:8080/api/')
	//.constant('ENDPOINT_API', 'http://192.168.0.50:8080/api/')
	//.constant('ENDPOINT_URL', 'http://localhost:4000')
	//.constant('ENDPOINT_API', 'http://191.182.25.177:8080/api/')
	//.constant('ENDPOINT_URL', 'http://191.182.25.177:8080')
	.constant('DEV_MODE', false)
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