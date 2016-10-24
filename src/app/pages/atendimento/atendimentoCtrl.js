/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
    .controller('atendimentoCtrl', cadastro_usuarioCtrl);

  /** @ngInject */
  function cadastro_usuarioCtrl($scope,atendimentoService,Session) {
      $scope.cadastroMode=true;
      $scope.atendimento={};
      $scope.atendimentos=[];
      //define the possible types of user that can be registered
      $scope.atendimento_tipos=[];
      $scope.acesso=['Acesso','Ligação','Acesso/Ligação'];
      atendimentoService.getAtendimentoTipos().then(function(data){
        console.log(data);
        $scope.atendimento_tipos=data.data.data;
      }) 
      /**
       * Atualiza dados da tabela
       */
      function atualizaDados(){
        atendimentoService.all().then(function (response) {
            $scope.atendimentos = response.data.data;
            console.log($scope.atendimentos);
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
        $scope.usuario={};
      }
      $scope.abrirChamado=function(){
        $scope.atendimento.userId=Session.userId;
        atendimentoService.create($scope.atendimento)
        .then(function(data) {
          console.log(data);
        },function(erro) {
          alert(erro.data.message);
        })
      }
  }

})();