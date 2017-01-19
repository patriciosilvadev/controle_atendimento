/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.geral', ['easypiechart'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
      .state('grafico.geral', {
        url: '/geral',
        templateUrl: 'app/pages/graficos/graficoGeral/grafico.html',
          title: 'Geral',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 100,
          },
          data: {
            authorizedRoles: [USER_ROLES.administrador]
          }
      });
  }

})();
