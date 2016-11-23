/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficosFaturamento')
      .controller('graficosFaturamentoCtrl', graficosFaturamentoCtrl);

  /** @ngInject */
  function graficosFaturamentoCtrl($scope, graficosFaturamentoService,$rootScope,
                        baConfig, baUtil,$timeout,$log,$q,toastr) {

            $scope.dt=undefined;
            $scope.dt2=undefined;
            //options for data
            $scope.dataOptions={
                datepickerMode:'month',
                //minMode:'month'
                maxDate: null
            };
            $scope.dataOptions2={
                datepickerMode:'month',
                //minMode:'month'
                minDate: null
            };
            $scope.date={};
            $scope.date2={};
            $scope.open=function(n){
                if(n==1){
                    $scope.dataOptions.maxDate=new Date($scope.dt2);
                    $scope.date.opened=!$scope.date.opened;
                    $log.info($scope.dataOptions2);
                    $log.info($scope.dt2);
                }else{
                    $scope.dataOptions2.minDate=new Date($scope.dt);
                    $scope.date2.opened=!$scope.date2.opened;
                }
            };
            $scope.pesquisar=function(){
                var deferred = $q.defer();
                deferred.notify();
                $timeout(function(){
                    if($scope.dt===undefined || $scope.dt2==undefined){
                        toastr.error('Por favor, selecione as datas!', 'Erro!');
                        deferred.reject();
                    }else{
                        toastr.info('Pesquisa Realizada com Sucesso!', 'Sucesso!');
                        graficosFaturamentoService.update($scope.dt,$scope.dt2);
                        deferred.resolve();
                    }
                },400);
                return deferred.promise;
            }

    
	}
})();