(function () {
  'use strict';
	angular.module('BlurAdmin')
	.factory('AuthService',AuthService); 
	/**
	 * 
	 */
	function AuthService(localStorageService,$http,
						Session,ENDPOINT_API,DEV_MODE,$q) {
		var authService = {};
		var path = "login";
		var url = ENDPOINT_API +path;
		/**
		 * Loads session from local storage and 
		 * saves it to the session service
		 */
		authService.login = function () {
			var deferred = $q.defer();
			var s = localStorageService.get("session");
			if(s){
				Session.create(s.id,
						s.tipo,
						s.email,
						s.username,
						s.token,
						s.nome
						);
				deferred.resolve();
			}else{
				deferred.reject();
			}
			return deferred.promise;
		};
		/**
		 * Checks if the user is authenticated by
		 * checking if the session has been saved
		 */
		authService.isAuthenticated = function () {
			return !!Session.id;
		};
		/**
		 * Verifies if the user can access an 
		 * specific page
		 */
		authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return ((authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.tipo) !== -1)
				|| DEV_MODE || authorizedRoles.indexOf("*") !== -1);
		};
		return authService;
	}
})();