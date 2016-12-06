/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('graficosCtrl', graficosCtrl);

  /** @ngInject */
    function graficosCtrl($scope, graficoService,$rootScope,
                        baConfig, baUtil,$timeout,$log,$q,toastr) {
        $scope.dt=undefined;
        //options for data
        $scope.dataOptions={
            datepickerMode:'month',
            //minMode:'month'
            maxDate: null
        };
        $scope.date={};
        $scope.open=function(n){
            $scope.date.opened=!$scope.date.opened;
        };
        $scope.pesquisar=function(){
            var deferred = $q.defer();
            deferred.notify();
            $timeout(function(){
                if($scope.dt===undefined){
                    toastr.error('Por favor, selecione as datas!', 'Erro!');
                    deferred.reject();
                }else{
                    toastr.info('Pesquisa Realizada com Sucesso!', 'Sucesso!');
                    graficoService.update($scope.dt);
                    deferred.resolve();
                }
            },400);
            return deferred.promise;
        }

    }
})();