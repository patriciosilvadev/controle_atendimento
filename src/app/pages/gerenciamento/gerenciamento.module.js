/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento', [
    //'BlurAdmin.pages.gerenciamento.timeline',
    'BlurAdmin.pages.gerenciamento.cadastroUsuario',
    'BlurAdmin.pages.gerenciamento.faturamentoAtendimento'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
        .state('gerenciamento', {
          url: '/gerenciamento',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'gerenciamento',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 6,
          },
          data: {
            authorizedRoles: [USER_ROLES.administrador]
          }
        });
  }

})();
