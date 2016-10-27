(function () {
  'use strict';
	angular.module('BlurAdmin')
	.factory('AuthService',AuthService); 
	/**
	 * 
	 */
	function AuthService(localStorageService,$http,
						Session,ENDPOINT_URI,DEV_MODE,$q) {
		var authService = {};
		var path = "login";
		var url = ENDPOINT_URI +path;
		/**
		 * Loads session from local storage and 
		 * saves it to the session service
		 */
		authService.login = function () {
			var deferred = $q.defer();
			var s = localStorageService.get("session");
			if(s){
				Session.create(s.usuario_id,
						s.tipo,
						s.username,
						s.token
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
			return !!Session.usuario_id;
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