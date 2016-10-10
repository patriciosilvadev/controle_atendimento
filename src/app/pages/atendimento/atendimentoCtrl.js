/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
    .controller('atendimentoCtrl', cadastro_usuarioCtrl);

  /** @ngInject */
  function cadastro_usuarioCtrl($scope,loginService) {
      //define the possible types of user that can be registered 
      $scope.message=loginService.getName();
  }

})();