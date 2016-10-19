/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos', ['easypiechart'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('graficos', {
          url: '/graficos',
          templateUrl: 'app/pages/graficos/dashboard.html',
          title: 'Graficos',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 1,
          },
        });
  }

})();
