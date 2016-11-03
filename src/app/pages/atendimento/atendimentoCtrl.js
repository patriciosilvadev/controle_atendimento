/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento')
	.controller('atendimentoCtrl', atendimentoCtrl);

  /** @ngInject */
	function atendimentoCtrl($scope,atendimentoService,
						Session,$filter, editableOptions,
						editableThemes,$q,$timeout,$uibModal) {
		/**Cria objecto atendimento e inicializa suas propriedades */
		$scope.smartTablePageSize = 10;
		$scope.displayedCollection=[];
		$scope.cadastroMode=true;
		$scope.atendimentos=[];
		//define the possible types of user that can be registered
		$scope.atendimento_tipos=[];
		$scope.acesso=['Acesso','Ligação','Acesso/Ligação'];
		$scope.atendimento={};
		function limpar(){
			var atendimento = $scope.atendimento;
			atendimento.cnpj="482923";
			atendimento.nome="";
			atendimento.contato="";
			atendimento.tipo_acesso="";
			atendimento.tipo_atendimento="";
			atendimento.problema="";
			atendimento.solucao="";
			atendimento.chamado=false;
		}limpar();

		atendimentoService.getAtendimentoTipos().then(function(data){
			console.log(data);
			$scope.atendimento_tipos=data.data.data;
	  	})
		/**
		 * Atualiza dados da tabela
		 */
		function atualizaDados(){
			atendimentoService.all().then(function (response) {
				limpar();
				$scope.atendimentos = response.data;
				console.log($scope.atendimentos);
			}, function (error) {
				$scope.status = 'Unable to load customer data: ' + error.message;
			});
			$scope.usuario={};
		}atualizaDados();
		$scope.abrirChamado=function(){
			var deferred = $q.defer();
			deferred.notify();
			$scope.atendimento.cnpj=parseInt(getNumber($scope.atendimento.cnpj));
			console.log($scope.atendimento.cnpj);
			$scope.atendimento.userId=Session.usuario_id;
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
		function getNumber(str){
			return str.replace(/[^\d]/g, '').slice(0, 14)
		}
		function applyMask(str){
			var number = getNumber(str);
			var cnpj = new StringMask('00.000.000\/0000-00');
			var cpf = new StringMask('000.000.000-00');
			var mascara ="";
			if(number.length>11){
				mascara = cnpj.apply(number);
			}else{
				mascara = cpf.apply(number);
			}
			return mascara.trim().replace(/[^0-9]$/, '');
		}
		$scope.key=function($event){
    		$scope.atendimento.cnpj = applyMask($scope.atendimento.cnpj);
		}
  }

})();