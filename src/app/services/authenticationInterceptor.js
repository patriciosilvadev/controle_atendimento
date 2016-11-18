(function () {
  'use strict';
	angular.module('BlurAdmin')
	.factory('AuthInterceptor',
	 function ($rootScope, $q, Session,$window,$log) {
		return {
			request: function (config) {
				config.headers = config.headers || {};
				if (Session.token!=null) {
					 config.headers['x-access-token'] = Session.token;
				}
				return config;
			},
			response: function (response) {
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				$log.error(rejection);
				if (rejection.status === 403 || rejection.status === 401) {
					 alert('Sua sessao expirou!');
					 //$window.location.href = '/auth.html';  
					 $log.error("Sessao expirada!");  
					 window.location.href = '/auth.html';    
				}else if(rejection.status===404){
					$log.error("could not connect to the server");
					alert('Nao foi possivel estabelecer conexao com o servidor!');
				}
                return $q.reject(rejection);
            }
		};
	});
})();