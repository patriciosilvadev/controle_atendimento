(function () {
  'use strict';
	angular.module('BlurAdmin')
	.factory('AuthInterceptor',
	 function ($rootScope, $q, Session,$window) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if (Session.token!=null) {
					 config.headers['x-access-token'] = Session.token;
				}
				return config;
			},
			response: function (response) {
				if (response.status === 403) {
					 $window.location.href = '/auth.html';        
				}
				return response || $q.when(response);
			},
			responseError: function(rejection) {
                console.log("could not connect to the server");
				alert("Could not connect to the server");
                return $q.reject(rejection);
            }
		};
	});
})();