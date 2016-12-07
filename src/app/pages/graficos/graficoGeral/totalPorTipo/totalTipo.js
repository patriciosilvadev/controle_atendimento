/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.geral')
      .controller('TotalTipoChartCtrl', TotalTipoChartCtrl);

  /** @ngInject */
  	function TotalTipoChartCtrl($scope, $log, baConfig, graficosFaturamentoService,
	  				colorHelper,graficoService, $interval,$rootScope) {

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
		}updateCharts();
		function createChart(){
			$scope.chartTipo=[];
			var porTipo=service.data.porTipo;
			$scope.totalMes=service.data.total_mes;
			for(var i=0;i<porTipo.length;i++){
				$log.info(porTipo[i]);
				$scope.chartTipo.push(
				createItem(
					porTipo[i].total_tipo,
					calcPercentage($scope.totalMes,porTipo[i].total_tipo),
					porTipo[i].descricao,
					i)
				);
			}
			//$log.info($scope.chartTipo);
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
		var listenner = $rootScope.$on("SYNC_CHART",function(events,args){
			updateCharts();
		});
		$scope.$on('$destroy', listenner);
  	}
})();