/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';
  /**
   * Modulo de cadastro de usuario
   */
  var app = angular.module('BlurAdmin.pages.gerenciamento.faturamentoAtendimento')
    .controller('faturamentoCtrl', faturamentoCtrl);

  app.filter('myStrictFilter', function($filter){
    return function(input, predicate){
        return $filter('filter')(input, predicate, true);
    }
  });
  /**
   * Controle para o cadastro de usuario
   */
    function faturamentoCtrl($filter,$scope,$http,faturamentoService,
                toastr,$q,$timeout,$log,$uibModal) {

        
        $scope.open = function (item) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/gerenciamento/faturacao/faturar_detalhe.html',
                size: 'lg',//size,
                controller: function($scope) {
                    $scope.item = item;  
                }
            });
        };
        var selectedDate= new Date();
        $scope.data=undefined;
        //options for data
        $scope.dataOptions={
            datepickerMode:'month',
            minMode:'month',
            maxMode: 'month'
        };

        $scope.date={opened:false};
        $scope.openDate=function(){
		$scope.date.opened=!$scope.date.opened;
		$log.info("Data :");
		$log.info($scope.$parent.data);
        };
        $scope.pesquisar=function(dt){
            var deferred = $q.defer();
            deferred.notify();
            $timeout(function(){
                if(dt===undefined){
                    toastr.error('Por favor, selecione as datas!', 'Erro!');
                    deferred.reject();
                }else{
                    toastr.info('Pesquisa Realizada com Sucesso!', 'Sucesso!');
                    selectedDate=dt;
                    atualizaDados(dt);
                    deferred.resolve();
                }
            },400);
            return deferred.promise;
        }

        $scope.faturas={};
        function atualizaDados(data){
            faturamentoService.all(data).then(function (response) {
                $scope.faturas = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        }atualizaDados(selectedDate);
        $scope.formataData=function(date){
            return $filter('date')(date, 'dd/MM/yyyy');
        };
        /**
         * Pega Numero
         */
        function getNumber(str){
            str+="";
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

        $scope.faturar=function(id){
            $log.info("faturando item");
            $log.info(id);
            faturamentoService.put(id).then(function(data){
                $log.debug("Faturado com sucesso");
                toastr.success('Faturado com sucesso', 'Sucesso ao Faturar!');
                atualizaDados(selectedDate);
            },function(error){
                toastr.error('Erro ao faturar', 'Erro!');
                $log.debug(error);
            })
        }

        /**
         * Faz o binding para o scope
         */
        $scope.applyMask=applyMask;
    }

})();