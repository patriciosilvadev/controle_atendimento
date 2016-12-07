/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico', [
    //'BlurAdmin.pages.gerenciamento.timeline',
    'BlurAdmin.pages.grafico.faturamento',
    'BlurAdmin.pages.grafico.geral'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
        .state('grafico', {
          url: '/grafico',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Grafico',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 100,
          },
          data: {
            authorizedRoles: [USER_ROLES.all]
          }
        });
  }

})();
