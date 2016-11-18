/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('destaquesCtrl', destaquesCtrl);

  /** @ngInject */
  	function destaquesCtrl($scope,$interval,graficoService,graficosFaturamentoService,$rootScope,$log) {
    	console.log($scope.tipo);

		var service ={};
		$scope.rs = "";
		if(isAtendimento()){
			service=graficoService;
		}else{
			$scope.rs="R$ ";
			service=graficosFaturamentoService;
		}
		function isAtendimento(){
			return $scope.tipo==='atendimento';
		}

		$scope.destaques=[];
		var colors= new Array(40);
		for(var i=0;i<colors.length;i++){
			colors[i]=getRandomColor();
		}
		function isAtendimento(){
			return $scope.tipo==='atendimento';
		}

		function updateCharts(){
				$scope.destaques=service.data.destaques;
				calcPercentage();
		}updateCharts();

		function calcPercentage(){
			var totalMes=service.data.total_mes;
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

		var listenner = $rootScope.$on("SYNC_CHART",function(events,args){
			updateCharts();
		});
		$scope.$on('$destroy', listenner);
  }
})();