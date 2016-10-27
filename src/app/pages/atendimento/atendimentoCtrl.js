/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
    .controller('atendimentoCtrl', atendimentoCtrl);

  /** @ngInject */
  function atendimentoCtrl($scope,atendimentoService,Session,$filter, editableOptions, editableThemes,$q,$timeout) {
      $scope.smartTablePageSize = 10;
      $scope.displayedCollection=[];
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
            $scope.atendimento={};
            $scope.atendimentos = response.data;
            console.log($scope.atendimentos);
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
        $scope.usuario={};
      }
      $scope.abrirChamado=function(){
        var deferred = $q.defer();
        deferred.notify();
        $scope.atendimento.userId=Session.userId;
          $timeout(function(){atendimentoService.create($scope.atendimento)
          .then(function(data) {
            alert("Inserido com sucesso!!!"); 
            atualizaDados();
            $scope.cadastroMode=true;
            deferred.resolve();
          },function(erro) {
            alert(erro.data.message);
            deferred.reject();   
          })},400);
          return deferred.promise;
      }
      atualizaDados();
  }

})();