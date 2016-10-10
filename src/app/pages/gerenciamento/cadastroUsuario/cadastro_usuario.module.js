/**
 * @author Vitor Silva Lima
 * created on 07/10/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.cadastroUsuario', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('gerenciamento.cadastroUsuario', {
          url: '/cadastroUsuario',
          templateUrl: 'app/pages/gerenciamento/cadastroUsuario/cadastro_usuario.html',
          title: 'Cadastro de Usuário',
          sidebarMeta: {
            order: 300,
          }
        });
  }

})();