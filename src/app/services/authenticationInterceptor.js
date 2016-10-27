(function () {
  'use strict';
        angular.module('BlurAdmin')
        .factory('AuthInterceptor',
         function ($rootScope, $q, Session) {
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
                                        // handle the case where the user is not authenticated
                                }
                                return response || $q.when(response);
                        }
                };
        });
})();