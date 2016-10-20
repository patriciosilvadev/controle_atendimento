(function () {
  'use strict';
        angular.module('BlurAdmin').factory('AuthService', function ($http, Session,ENDPOINT_URI,DEV_MODE) {
                var authService = {};
                var path = "login";
                var url = ENDPOINT_URI +path;
                authService.login = function (login) {
                        return $http
                        .post('/login', login)
                        .then(function (response) {
                                
                                //return res.data.user;
                        });
                };
                authService.isAuthenticated = function () {
                        return !!Session.userId;
                };
                
                authService.isAuthorized = function (authorizedRoles) {
                        if (!angular.isArray(authorizedRoles)) {
                                authorizedRoles = [authorizedRoles];
                        }
                        return ((authService.isAuthenticated() &&
                        authorizedRoles.indexOf(Session.userRole) !== -1) || DEV_MODE);
                };
                
                return authService;
        })
})();