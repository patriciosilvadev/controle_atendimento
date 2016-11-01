/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('destaquesCtrl', destaquesCtrl);

  /** @ngInject */
  function destaquesCtrl($scope,$interval,graficoService,$rootScope) {
    $scope.destaques=[];
    function updateCharts(){
            $scope.destaques=graficoService.data.destaques;
            calcPercentage();
    };
    updateCharts();
    function calcPercentage(){
		var totalMes=graficoService.data.atendimentoMes;
		for(var i=0;i<$scope.destaques.length;i++){
			$scope.destaques[i].porcentagem=((100/totalMes)*$scope.destaques[i].total);
		}
    }
    $rootScope.$on("SYNC_CHART",function(events,args){
		  updateCharts();
    });
    updateCharts();
  }
})();