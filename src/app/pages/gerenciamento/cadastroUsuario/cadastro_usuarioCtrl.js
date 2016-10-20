/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';
  /**
   * Modulo de cadastro de usuario
   */
  angular.module('BlurAdmin.pages.gerenciamento.cadastroUsuario')
    .controller('cadastro_usuarioCtrl', cadastro_usuarioCtrl);
  /**
   * Controle para o cadastro de usuario
   */
  function cadastro_usuarioCtrl($scope,$http,usuarioService,$q,$timeout) {
    $scope.usuario={};
    $scope.usuarios={};
    $scope.cadastroMode=true;
    /**
     * Atualiza dados da tabela
     */
    function atualizaDados(){
        usuarioService.all().then(function (response) {
            $scope.usuarios = response.data.data;
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
        $scope.usuario={};
    }
    atualizaDados();
    /**
     * Criar usuario
     */
    $scope.criarUsuario=function(){
        $scope.cadastroMode=true;
        var deferred = $q.defer();
        deferred.notify();
        $timeout(()=>{usuarioService.create($scope.usuario).then((response)=>{
            alert("Inserido com sucesso!!!"); 
            atualizaDados();
            $scope.cadastroMode=true;
            deferred.resolve();
        },(erro)=>{
            $scope.cadastroMode=true;
            alert(erro.data.message);
            deferred.reject();   
        });},400);
        return deferred.promise;
    };
    /**
     * Salva alteracoes feiras 
     */
    $scope.salvar=function(){
        var deferred = $q.defer();
        deferred.notify();
        $timeout(()=>{usuarioService.update($scope.usuario).then((response)=>{
            alert("Salvado com sucesso!"); 
            atualizaDados();
            $scope.cadastroMode=true;
            deferred.resolve();
        },(erro)=>{
            $scope.cadastroMode=true;
            alert(erro.data.message);
            deferred.reject();    
        });},400);
        return deferred.promise;
    };
    /**
     * Deletar Usuario
     */
    $scope.deletar=function(){
        $scope.cadastroMode=true;
        var deferred = $q.defer();
        deferred.notify();
        $timeout(()=>{usuarioService.deleta($scope.usuario).then((response)=>{
            alert("Usuario Deletado!!!"); 
            atualizaDados();
            deferred.resolve();
        },(erro)=>{
            deferred.reject();
            alert(erro.data.message);    
        });},400);
        return deferred.promise;
    };
    /**
     * Seleciona o usuario da tabela
     */
    $scope.selecionar=function(index){
        $scope.cadastroMode=false;
        $scope.usuario=$scope.usuarios[index];
    };
    $scope.tipos = ['administrador','atendente'];
  }

})();