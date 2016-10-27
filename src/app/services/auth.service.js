(function () {
  'use strict';
        angular.module('BlurAdmin')
        .factory('AuthService', function (localStorageService,$http,
                                Session,ENDPOINT_URI,DEV_MODE,$q) {
                var authService = {};
                var path = "login";
                var url = ENDPOINT_URI +path;
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