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
							 Session,$filter, editableOptions, $log,
							 editableThemes,$q,$timeout,$uibModal,toastr) {
	    $scope.ctrl={};
		/**Cria objecto atendimento e inicializa suas propriedades */
		$scope.smartTablePageSize = 10;
		$scope.displayedCollection=[];
		$scope.atendimentos=[];
		$scope.cadastroMode=true;
		$scope.finalizarMode=false;
		$scope.viewMode=false;
		$scope.saveMode=false;
		
		//define the possible types of user that can be registered
		$scope.atendimento_tipos=[];
		$scope.acesso=['Acesso','Ligação','Acesso/Ligação'];
		$scope.status=['aguardando aprovação','aprovado','não aprovado'];
		$scope.atendimento={};

		function limpar(){
			var atendimento = $scope.atendimento;
			atendimento.cnpj="";
			atendimento.nome="";
			atendimento.contato="";
			atendimento.tipo_acesso="";
			atendimento.tipo_atendimento="";
			atendimento.problema="";
			atendimento.solucao="";
			atendimento.motivo="";
			atendimento.chamado=false;
			atendimento.valor=null;
			atendimento.status="";
			$scope.cadastroMode=true;
			$scope.finalizarMode=false;
			$scope.viewMode=false;
			$scope.more=false;
			$scope.saveMode=false;
		}limpar();
		$scope.limpar=limpar;

		/**
		 * 
		 */
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

		/**
		 * Abre Chamado
		 */
		$scope.abrirChamado=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.ctrl.Form.$valid){
				$scope.atendimento.cnpj=parseInt(getNumber($scope.atendimento.cnpj));
				$scope.atendimento.valor=parseFloat($scope.atendimento.valor)
				console.log($scope.atendimento.cnpj);
				$scope.atendimento.userId=Session.usuario_id;
				$timeout(function(){atendimentoService.create($scope.atendimento)
				.then(function(data) {
					 toastr.success('Atendimento aberto com sucesso!', 'Sucesso!');
					atualizaDados();
					deferred.resolve();
				},function(erro) {
					alert(erro.data.message);
					deferred.reject();
				})},400);
			}else{
      			toastr.error('Digite os campos necessários para abrir o atendimento', 'Erro');
				deferred.reject();
			}
			return deferred.promise;
		}

		/**
		 * Pega Numero
		 */
		function getNumber(str){
			if(str===undefined){
				str="";
			}
			return str.replace(/[^\d]/g, '').slice(0, 14)
		}

		/**
		 * Aplica Mascara
		 */
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

		/**
		 * Faz o binding para o scope
		 */
		$scope.applyMask=applyMask;

		/**
		 * Aplica Mascara on Keypress
		 */
		$scope.key=function($event){
			
    		$scope.atendimento.cnpj = applyMask($scope.atendimento.cnpj);
		}

		/**
		 * Aplica Mascara on Keypress
		 */
		$scope.keyPreco=function(valor){
			if(valor!==undefined && valor!==null
				&& valor!==""){
				var moneyMask=new StringMask("##0.00", {reverse: true});
				var actualNumber = valor.replace(/[^\d]+/g,'');
				actualNumber = actualNumber.replace(/^[0]+([1-9])/,'$1');
				actualNumber = actualNumber || '0';
				$scope.atendimento.valor = moneyMask.apply(actualNumber);
			}
		}

		/**
		 * 
		 */
		$scope.procura=function(cnpj){
		    cnpj =parseInt(getNumber(cnpj));
			if(!isNaN(cnpj)){
				atendimentoService.getCliente(cnpj).then(function (response) {
					if(response.data.nome!==null && response.data.nome!==undefined){
						$scope.atendimento.nome=response.data.nome;
					}
					$log.info("Cliente encontrado");
				});
			}
		}

		/**
		 * 
		 */
		$scope.verificarMore=function(opcao){
			if(opcao==='Avulso Online' || opcao==='Avulso Local'){
				$scope.more=true;
			}else{
				$scope.more=false;
			}
		}
		$scope.seleciona=function(item){
			if(Session.usuario_id!=item.usuario_id){
				$log.log("Selecionou item de outra usuario!!!");
				$scope.cadastroMode=false;
				$scope.finalizarMode=false;
				$scope.viewMode=true;
				$scope.saveMode=false;
			}else{
				$log.log("Selecionou um item de si mesmo");
				$log.log(item);
				$scope.cadastroMode=false;
				$scope.viewMode=false;
				$scope.saveMode=true;
				item.aberto
			    $scope.finalizarMode=!!item.aberto;
			}
			$scope.atendimento=clone(item);
			$scope.atendimento.cnpj = applyMask($scope.atendimento.cnpj);
			$scope.atendimento.tipo_atendimento=clone(item.descricao);
			$scope.verificarMore(item.descricao);
		}

		$scope.formataData=function(date){
			return $filter('date')(date, 'dd/MM/yyyy');
		};

		/*function verifica(){
			var atendimento= $scope.atendimento;
			return (atendimento.cnpj.length==14 ||atendimento.cnpj.length==18)
			&& atendimento.nome!==""
			&& atendimento.contato!==""
			&& atendimento.tipo_acesso!==""
			&& atendimento.tipo_atendimento!=="";
		}*/
		function clone(obj) {
			if (null == obj || "object" != typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			}
			return copy;
		}

		$scope.finalizarChamado=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.ctrl.Form.$valid){
				var item = clone($scope.atendimento);
				$log.debug(item);
				item.cnpj=parseInt(getNumber($scope.atendimento.cnpj));
				item.valor=parseFloat($scope.atendimento.valor)
				$timeout(function(){atendimentoService.finalizar($scope.atendimento)
				.then(function(data) {
					toastr.success('Atendimento Finalizado com sucesso!', 'Finalizado!');
					atualizaDados();
					$log.info("Finalizando Chamado");
					deferred.resolve();
				},function(erro) {
					alert(erro.data.message);
					deferred.reject();
				})},400);
			}else{
      			toastr.error('Digite os campos necessários para abrir o atendimento', 'Erro');
				deferred.reject();
			}
			return deferred.promise;
		};

		$scope.salvarChamado=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.ctrl.Form.$valid){
				var item = clone($scope.atendimento);
				$log.debug(item);
				item.cnpj=parseInt(getNumber($scope.atendimento.cnpj));
				item.valor=parseFloat($scope.atendimento.valor)
				$timeout(function(){atendimentoService.update($scope.atendimento)
				.then(function(data) {
					toastr.success('Atendimento salvo com sucesso!', 'Sucesso!');
					atualizaDados();
					$log.info("Salvando Chamado");
					deferred.resolve();
				},function(erro) {
					alert(erro.data.message);
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