/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.faturamento', ['easypiechart'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
      .state('grafico.faturamento', {
        url: '/faturamento',
        templateUrl: 'app/pages/graficos/graficoFaturamento/graficosFaturamento.html',
          title: 'Faturamento',
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
