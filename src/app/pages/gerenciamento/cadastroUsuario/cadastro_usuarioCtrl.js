/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.cadastroUsuario')
    .controller('cadastro_usuarioCtrl', cadastro_usuarioCtrl);

  /** @ngInject */
  function cadastro_usuarioCtrl($scope,$http,usuarioService) {
        //define the possible types of user that can be registered 
    $scope.usuario={};
    $scope.usuarios={};
    usuarioService.all().then(function (response) {
        $scope.usuarios = response.data.data;
    }, function (error) {
        $scope.status = 'Unable to load customer data: ' + error.message;
    });

    $scope.criarUsuario=function(){
        usuarioService.create($scope.usuario).then(function(response){
            console.log(response);
        });
    };





    $scope.selecionar=function(index){
        $scope.usuario=$scope.usuarios[index];
    };

      $scope.tipos = ['administrador','atendente'];
  }

})();