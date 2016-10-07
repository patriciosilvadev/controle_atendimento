/**
 * @author a.demeshko
 * created on 1/12/16
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.graficos', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('gerenciamento.graficos', {
        url: '/graficos',
        templateUrl: 'app/pages/gerenciamento/graficos/graficos.html',
          title: 'Gráficos',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 50,
          },
      });
  }
})();