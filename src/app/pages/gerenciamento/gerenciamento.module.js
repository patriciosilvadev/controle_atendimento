/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento', [
    'BlurAdmin.pages.gerenciamento.timeline',
    'BlurAdmin.pages.gerenciamento.cadastroUsuario'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('gerenciamento', {
          url: '/gerenciamento',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'gerenciamento',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 100,
          },
        });
  }

})();
