/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficosFaturamento', ['easypiechart'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
        .state('graficosFaturamento', {
          url: '/graficosFaturamento',
          //controller:'graficosFaturamentoCtrl',
          templateUrl: 'app/pages/graficosFaturamento/graficosFaturamento.html',
          title: 'Graficos Faturamento',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 1,
          },
          data: {
            authorizedRoles: [USER_ROLES.administrador, USER_ROLES.atendente]
          }
        });
  }

})();
