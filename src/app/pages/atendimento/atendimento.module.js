/**
 * @author vitorsilvalima
 * created on 05.10.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento', ['BlurAdmin.pages.atendimento.service'])
      .config(routeConfig)
      .controller('atendimentoController',function(formata,$scope){
        $scope.formataCampo=formata.formataCampo;
        $scope.mascaraCNPJ=formata.mascaraCNPJ;
          //formata.oi();
      });

  /** @ngInject */
  function routeConfig($stateProvider) {


    $stateProvider
        .state('atendimento', {
          url: '/atendimento',
          templateUrl: 'app/pages/atendimento/atendimento.html',
          title: 'Atendimento',
          controller:'atendimentoController',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 8,
          },
        });
  }

})();
