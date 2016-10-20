/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
        angular.module('BlurAdmin').service('Session', function () {
                this.create = function (sessionId, userId, userRole) {
                        this.id = sessionId;
                        this.userId = userId;
                        this.userRole = userRole;
                };
                this.destroy = function () {
                        this.id = null;
                        this.userId = null;
                        this.userRole = null;
                };
        });
})();