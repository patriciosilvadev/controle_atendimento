/**
 * @author a.demeshko
 * created on 1/12/16
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.timeline', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('gerenciamento.timeline', {
        url: '/timeline',
        templateUrl: 'app/pages/gerenciamento/timeline/timeline.html',
          title: 'Timeline',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 100,
          },
      });
  }
})();