/**
 * @author Vitor Silva Lima
 * created on 07/10/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.faturamentoAtendimento', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,USER_ROLES) {
    $stateProvider
        .state('gerenciamento.faturamentoAtendimento', {
          url: '/faturamentoAtendimento',
          templateUrl: 'app/pages/gerenciamento/faturacao/faturar_atendimento.html',
          title: 'Faturamento',
          sidebarMeta: {
            order: 300,
          },
          data: {
            authorizedRoles: [USER_ROLES.administrador]
          }
        });
  }

})();