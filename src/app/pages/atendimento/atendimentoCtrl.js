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
							 editableThemes,$q,$timeout
							 ,$uibModal,toastr,Util) {
		/**
		 * Retrieves utils
		 */
		Util.atualiza().then(function(){
			$scope.tipo_acesso=Util.tipo_acesso;
			$scope.tipo_atendimento=Util.tipo_atendimento;
			$scope.status=Util.status;
		});

		$scope.data=new Date();
        //options for data
        $scope.dataOptions={
            datepickerMode:'month',
            minMode:'month',
            maxMode: 'month'
        };

        $scope.date={opened:false};
        $scope.open=function(){
		$scope.date.opened=!$scope.date.opened;
		$log.info("Data :");
		$log.info($scope.$parent.data);
        };
        $scope.pesquisar=function(dt){
            var deferred = $q.defer();
            deferred.notify();
            $timeout(function(){
                if(dt===undefined || dt==null || dt.length<5){
                    toastr.error('Por favor, selecione as datas!', 'Erro!');
                    deferred.reject();
                }else{
                    toastr.info('Pesquisa Realizada com Sucesso!', 'Sucesso!');
                    $scope.data=dt;
		    atualizaDados();
                    deferred.resolve();
                }
            },400);
            return deferred.promise;
        }
	    
	    $scope.ctrl={};
		/**Cria objecto atendimento e inicializa suas propriedades */
		$scope.smartTablePageSize = 10;
		$scope.displayedCollection=[];
		$scope.atendimentos=[];

		//define the possible types of user that can be registered
		$scope.atendimento_tipos=[];
		$scope.atendimento={};

		function limpar(){
			var atendimento = $scope.atendimento;

			atendimento.cliente={};
			atendimento.cliente.cnpj="";
			atendimento.cliente.nome="";

			atendimento.valor={};
			atendimento.valor.status_id="";
			atendimento.valor.valor=null;

			atendimento.contato="";
			atendimento.tipo_acesso_id="";
			atendimento.tipo_atendimento_id="";
			atendimento.problema="";
			atendimento.solucao="";
			atendimento.motivo="";
			atendimento.chamado=false;

			$scope.abrir=true;
			$scope.fechar=false;
			$scope.salvar=false;
			$scope.disableStatus=false;
			$scope.finalizar=false;
			$scope.excluir=false;
			$scope.more=false;
			$scope.motivo=false;

		}limpar();
		$scope.limpar=limpar;



		/**Disable Status */
		$scope.mudaStatus=function(id){
			$log.debug("disabled "+id);
			var found = $filter('getById')($scope.status, id);
			if(found && (found.descricao.indexOf('NÃO FATURADO')>=0 || found.descricao.indexOf('NÃO APROVADO')>=0)){
				$scope.motivo=true;
				$scope.disableStatus=true;
			}else if(found && (found.descricao.indexOf('FATURADO')>=0)){
				
				$scope.disableStatus=true;
			
			}else{
				$scope.motivo=false;
				$scope.disableStatus=false;
			}
		};
		
		/**
		 * Atualiza dados da tabela
		 */
		function atualizaDados(){
			atendimentoService.all($scope.data).then(function (response) {
				limpar();
				$scope.atendimentos = response.data;
				$log.info($scope.atendimentos);
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
				$scope.atendimento.usuario_id=Session.id;
				var item = Util.clone($scope.atendimento);

				$timeout(function(){atendimentoService.create(item)
				.then(function(data) {

					 toastr.success('Atendimento aberto com sucesso!', 'Sucesso!');
					atualizaDados();
					deferred.resolve();

				},function(erro) {

					toastr.error('Ocorreu o seguinte erro: '+ erro.data.message, 'Erro');
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
			return mascara.trim().replace('/[^0-9]$/', '');
		}

		/**
		 * Faz o binding para o scope
		 */
		$scope.applyMask=applyMask;

		/**
		 * Aplica Mascara on Keypress
		 */
		$scope.key=function($event){
			var cnpj =$scope.atendimento.cliente.cnpj;
    		$scope.atendimento.cliente.cnpj = applyMask(cnpj);
		};

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
				$scope.atendimento.valor.valor = moneyMask.apply(actualNumber);
			}
		}

		/**
		 * 
		 */
		$scope.procura=function(cnpj){
			if(cnpj!==undefined && cnpj.length>0){
				atendimentoService.getCliente(cnpj).then(function (response) {
					if(response.data.nome!==null && response.data.nome!==undefined){
						$scope.atendimento.cliente.nome=response.data.nome;
					}
					$log.info("Cliente encontrado");
				});
			}
		}

		/**
		 * 
		 */
		$scope.verificarMore=function(opcao){
			var found = $filter('getById')($scope.tipo_atendimento, opcao);
			$scope.atendimento.tipo_atendimento=found;
			if(found && (found.descricao.indexOf('AVULSO ONLINE')>=0 
			  || found.descricao.indexOf('AVULSO LOCAL' )>=0)){
				
				$scope.more=true;
			
			}else{
				
				$scope.more=false;
			
			}
		}
		$scope.seleciona=function(item){
			
			$log.log(item);
			$scope.abrir=false;

			/**verify if user can edit */
			if(Session.id==item.usuario_id || Session.tipo=="administrador"){

				$scope.salvar=true;
				$scope.finalizar=item.aberto;
				if(Session.tipo==="administrador"){
					$scope.exluir=true;
				}

			}else{

				$scope.fechar=true;

			}


			$scope.atendimento= Util.clone(item);
			$scope.verificarMore(item.tipo_atendimento_id);
			$scope.mudaStatus(item.valor.status_id)
		}

		$scope.formataData=function(date){
			return $filter('date')(date, 'dd/MM/yyyy');
		};

		$scope.finalizarChamado=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.ctrl.Form.$valid){
				$scope.atendimento.aberto=false;
				$scope.salvarChamado().then(function(){
					deferred.resolve();
				},function(){
					deferred.reject();
				});
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
				var item = Util.clone($scope.atendimento);
				$log.debug(item);
				//item.valor=parseFloat($scope.atendimento.valor)
				$timeout(function(){atendimentoService.update($scope.atendimento)
				.then(function(data) {
					toastr.success('Atendimento  atualizado com sucesso!', 'Sucesso!');
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


		$scope.excluir=function(){
			var deferred = $q.defer();
			deferred.notify();
			if($scope.ctrl.Form.$valid){
				var item = Util.clone($scope.atendimento);
				$log.debug(item);
				//item.valor=parseFloat($scope.atendimento.valor)
				$timeout(function(){atendimentoService.deleta($scope.atendimento)
				.then(function(data) {
					toastr.success('Atendimento  excluido com sucesso!', 'Excluido!');
					atualizaDados();
					deferred.resolve();
				},function(erro) {
					alert(erro.data.message);
					deferred.reject();
				})},400);
			}else{
      			toastr.error('Erro ao tentar excluir', 'Erro');
				deferred.reject();
			}
			return deferred.promise;
		};

		

  }

})();