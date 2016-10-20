(function () {
  'use strict';
        angular.module('BlurAdmin').factory('AuthService', function ($http, Session,ENDPOINT_URI,DEV_MODE,$q) {
                var authService = {};
                var path = "login";
                var url = ENDPOINT_URI +path;
                authService.login = function (login) {
                        var deferred = $q.defer();
                        $http
                        .post(url, login)
                        .then(function (response) {
                                console.log(response.data);
                                Session.userRole=response.data.tipo;
                                Session.userId=response.data.usuario_id;
                                deferred.resolve();
                                //return res.data.user;
                        },function(err){
                                deferred.reject(err);
                                console.log("teste");
                        });
                        return deferred.promise;
                };
                authService.isAuthenticated = function () {
                        return !!Session.userId;
                };
                
                authService.isAuthorized = function (authorizedRoles) {
                        if (!angular.isArray(authorizedRoles)) {
                                authorizedRoles = [authorizedRoles];
                        }
                        return ((authService.isAuthenticated() &&
                                authorizedRoles.indexOf(Session.userRole) !== -1)
                                || DEV_MODE);
                };
                return authService;
        })
})();