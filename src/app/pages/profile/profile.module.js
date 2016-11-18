/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Perfil',
          templateUrl: 'app/pages/profile/profile.html',
          controller: 'ProfilePageCtrl',
          sidebarMeta: {
            icon: 'ion-person',
            order: 3,
			    },
          data: {
            authorizedRoles: [USER_ROLES.administrador, USER_ROLES.atendente]
          }
        });
  }

})();
