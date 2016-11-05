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
			atendimento.chamado=false;
			atendimento.valor=0.0;
			atendimento.aprovado=true;
			$scope.cadastroMode=true;
			$scope.finalizarMode=false;
			$scope.viewMode=false;
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
			if(verifica()){
				$scope.atendimento.cnpj=parseInt(getNumber($scope.atendimento.cnpj));
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
		 * 
		 */
		$scope.procura=function(cnpj){
		    cnpj =parseInt(getNumber(cnpj));
			atendimentoService.getCliente(cnpj).then(function (response) {
				$scope.atendimento.nome=response.data.nome;
				console.log(response);
			});
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
				$scope.cadastroMode=false;
				$scope.viewMode=false;
				$scope.saveMode=true;
				item.aberto
			    $scope.finalizarMode=!!item.aberto;
			}
			$scope.atendimento=item;
			$scope.atendimento.cnpj = applyMask($scope.atendimento.cnpj);
			$scope.atendimento.tipo_atendimento=item.descricao;
			$scope.verificarMore(item.descricao);
		}

		$scope.formataData=function(date){
			return $filter('date')(date, 'dd/MM/yyyy');
		};

		function verifica(){
			var atendimento= $scope.atendimento;
			return (atendimento.cnpj.length==14 ||atendimento.cnpj.length==18)
			&& atendimento.nome!==""
			&& atendimento.contato!==""
			&& atendimento.tipo_acesso!==""
			&& atendimento.tipo_atendimento!=="";
		}

		$scope.finalizarChamado=function(){
			$log.info("Finalizando Chamado");
			limpar();
		};

		$scope.salvarChamado=function(){
			$log.info("Salvando Chamado");
			limpar();
		};

		

  }

})();