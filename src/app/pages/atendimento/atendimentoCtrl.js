/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
    .controller('atendimentoCtrl', cadastro_usuarioCtrl);

  /** @ngInject */
  function cadastro_usuarioCtrl($scope,loginService,atendimentoService) {
      //define the possible types of user that can be registered
      $scope.atendimento_tipos=[];
      $scope.acesso=['Acesso','Ligação','Acesso/Ligação'];
      atendimentoService.getAtendimentoTipos().then(function(data){
        console.log(data);
        $scope.atendimento_tipos=data.data.data;
      }) 
  }

})();