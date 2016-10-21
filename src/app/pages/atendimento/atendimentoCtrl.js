/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
    .controller('atendimentoCtrl', cadastro_usuarioCtrl);

  /** @ngInject */
  function cadastro_usuarioCtrl($scope,atendimentoService) {
      $scope.cadastroMode=true;
      $scope.atendimento={};
      //define the possible types of user that can be registered
      $scope.atendimento_tipos=[];
      $scope.acesso=['Acesso','Ligação','Acesso/Ligação'];
      atendimentoService.getAtendimentoTipos().then(function(data){
        console.log(data);
        $scope.atendimento_tipos=data.data.data;
      }) 
      $scope.abrirChamado=function(){
        console.log($scope.atendimento);
        atendimentoService.create($scope.atendimento)
        .then(function(data) {
          console.log(data);
        },function(erro) {
          alert(erro);
        })
      }
  }

})();