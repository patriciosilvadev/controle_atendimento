/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('TotalTipoChartCtrl', TotalTipoChartCtrl);

  /** @ngInject */
  	function TotalTipoChartCtrl($scope, $log, baConfig, colorHelper,graficoService, $interval,$rootScope) {
		$scope.totalMes=0;
		var colorTipo=new Array(40);

		function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
		for(var i=0;i<colorTipo.length;i++){
			colorTipo[i]=getRandomColor();
			$log.debug(i+ " Color "+colorTipo[i]);
		}
		$scope.transparent = baConfig.theme.blur;
		var dashboardColors = ["#FFA22A","#E88567","#AF0CE8","#2ADAFF","#FF0000","#89E87C",
			"#E8C87C","#4D31FF","#E8D93C","#3CADE5","#E53C58","#3CE5CB","#997B44"];
		$scope.chartTipo=[];
		var ctx = document.getElementById('chart-area').getContext('2d');
		window.myDoughnut = new Chart(ctx).Doughnut($scope.chartTipo, {
			segmentShowStroke: false,
			percentageInnerCutout : 64,
			responsive: true
		});
		function updateCharts(){
			createChart();
			var ctx = document.getElementById('chart-area').getContext('2d');
			window.myDoughnut = new Chart(ctx).Doughnut($scope.chartTipo, {
			segmentShowStroke: false,
			percentageInnerCutout : 64,
			responsive: true,
			animateRotate: false
			});
		};
		function createChart(){
			$scope.chartTipo=[];
			var porTipo=graficoService.data.porTipo;
			$scope.totalMes=graficoService.data.atendimentoMes;
			for(var i=0;i<porTipo.length;i++){
				$scope.chartTipo.push(
				createItem(
					porTipo[i].total,
					calcPercentage($scope.totalMes,porTipo[i].total),
					porTipo[i].descricao,
					i)
				);
			}
		}
		function createItem(value,porcentagem,descricao,item){
			return {
				value: value,
				color: colorTipo[item],
				highlight: colorTipo[item],
				label: descricao,
				porcentagem: porcentagem,
				order: item,
			};
		}
		function calcPercentage(total,value){
		return (100/total)*value;
		}
		/**Resposable for updating charts when the event is fired */
	    $rootScope.$on("SYNC_CHART",function(events,args){
			updateCharts();
    	});
		updateCharts();
  	}
})();