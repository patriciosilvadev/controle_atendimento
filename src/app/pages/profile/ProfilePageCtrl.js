/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
	'use strict';

	angular.module('BlurAdmin.pages.profile')
	.controller('ProfilePageCtrl', ProfilePageCtrl);

	/** @ngInject */
	function ProfilePageCtrl($scope,$q,Session,toastr,
						$http,$log,ENDPOINT_API,$timeout) {
		var path = "usuarios";
    	var url = ENDPOINT_API +path;
		$scope.usuario={};
		$scope.ctrl={};


		function limpar(){
			$http.get(url+"/"+Session.id).then(function(response){
				$scope.usuario=response.data;
				$scope.usuario.passwordTeste=$scope.usuario.password;
				$log.info(response);
			},function(error){
				toastr.error("Nao foi possivel encontrar seu usuarior","Erro");
				$log.error("Nao foi possivel encontrar usuario!!!");
			});
		}limpar();

		$scope.salvarUsuario=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.usuario.password!==$scope.usuario.passwordTeste){
				toastr.error('Senha Invalida!', 'Erro!');
				deferred.reject();
			}else if($scope.ctrl.Form.$valid){
				$timeout(function(){$http.put(url+"/"+Session.id,$scope.usuario)
				.then(function(data) {
					toastr.success('Os dados foram salvos com sucesso', 'Sucesso!');
					limpar();
					deferred.resolve();
				},function(erro) {
					toastr.error('Erro ao salvar os dados!', 'Erro!');
					deferred.reject();
				})},400);
			}else{
      			toastr.error('Digite os campos necessários para abrir o atendimento', 'Erro');
				deferred.reject();
			}
			return deferred.promise;
		};

	}
})();
