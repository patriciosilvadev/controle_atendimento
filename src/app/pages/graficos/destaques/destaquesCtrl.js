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
	var colors=[40];
    function updateCharts(){
            $scope.destaques=graficoService.data.destaques;
            calcPercentage();
    };
    updateCharts();
    function calcPercentage(){
		var totalMes=graficoService.data.atendimentoMes;
		for(var i=0;i<$scope.destaques.length;i++){
			//$scope.destaques[i].color=getRandomColor();
			$scope.destaques[i].color=colors[i];
			$scope.destaques[i].porcentagem=((100/totalMes)*$scope.destaques[i].total);
		}
    }
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
	for(var i=0;i<colors.length;i++){
		colors[i]=getRandomColor();
	}
    $rootScope.$on("SYNC_CHART",function(events,args){
		  updateCharts();
    });
    updateCharts();
  }
})();