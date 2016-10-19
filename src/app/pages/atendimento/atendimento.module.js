/**
 * @author vitorsilvalima
 * created on 05.10.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento', ['BlurAdmin.pages.atendimento.service'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var oi=true;
    if(oi){
          $stateProvider
        .state('atendimento', {
          url: '/atendimento',
          templateUrl: 'app/pages/atendimento/atendimento.html',
          title: 'Atendimento',
          sidebarMeta: {
            icon: 'ion-ios-telephone',
            order: 8,
          },
          data: {
            roles: "adminstrador, atendente, desenvolvedor"
          }
        });
    }
  



}

})();
