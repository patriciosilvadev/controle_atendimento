/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.geral')
      .controller('graficosPieChartCtrl', graficosPieChartCtrl);

  /** @ngInject */
  function graficosPieChartCtrl($scope, graficoService,$rootScope,
							baConfig, $log, baUtil,$timeout,graficosFaturamentoService) {

		var service ={};
		var rs = "";
		if(isAtendimento()){
			service=graficoService;
		}else{
			rs="R$ ";
			service=graficosFaturamentoService;
		}
		function isAtendimento(){
			return $scope.tipo==='atendimento';
		}
		$scope.isAtendimento=isAtendimento();
		/**
		 * create variables
		 */
		$scope.charts=[];
		var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

		function createChar(description,icon){
			return {
				color:pieColor,
				description:description,
				stats:0,
				icon:icon,
				percent:0
			};
		}

		if(isAtendimento()){
			$scope.charts.push(createChar('Atendimentos Do Mes','person'));
			$scope.charts.push(createChar('Atendimentos da Semana','person'));
			$scope.charts.push(createChar('Visitas - Mes','face'));
			$scope.charts.push(createChar('Destaque do Mes','face'));
		}else{
			$scope.charts.push(createChar('Faturamento Mes','person'));
			$scope.charts.push(createChar('Faturamento da Semana','person'));
			$scope.charts.push(createChar('Nao Aprovados - Mes','face'));
			$scope.charts.push(createChar('Destaque do Mes','face'));
		}
		
		function loadPieCharts() {
			$('.chart').each(function () {
				var chart = $(this);
				chart.easyPieChart({
					easing: 'easeOutBounce',
					onStep: function (from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
					},
					barColor: pieColor,
					trackColor: 'rgba(0,0,0,0)',
					size: 84,
					scaleLength: 0,
					animation: 2000,
					lineWidth: 9,
					lineCap: 'round',
				});
			});
		}

		function calcPercentage(total,value){
			if(total===0 || value ===0){
				return 0;
			}
			return (100/total)*value;
		}

		function updateCharts(){
			var data=service.data;
			//update Atendimento por mes
			$scope.charts[0].stats=rs + data.total_mes;
			$scope.charts[0].percent=calcPercentage(data.total_ano,data.total_mes);
			//update Atendimento por semana
			$scope.charts[1].stats= rs +(data.total_semana || 0);
			$scope.charts[1].percent=calcPercentage(data.total_mes,(data.total_semana||0));
			

			if(isAtendimento()){
				$scope.charts[2].stats= rs +data.total_visitas;
				$scope.charts[2].percent=calcPercentage(data.total_mes,data.total_visitas);
			}else{
				//nao Aprovados
				$scope.charts[2].stats= rs +data.nao_aprovados;
				$scope.charts[2].percent=calcPercentage(data.total_mes,data.nao_aprovados);
			}

			//update
			var destaqueTotal=0
			if(data.destaques[0]!==undefined){
				destaqueTotal=data.destaques[0].total;
			}
			$scope.charts[3].stats= rs + (destaqueTotal);
			$scope.charts[3].percent=calcPercentage(data.total_mes,destaqueTotal);

			$('.pie-charts .chart').each(function(index, chart) {
				$(chart).data('easyPieChart').update($scope.charts[index].percent);
			});
		};

		$timeout(function(){
			loadPieCharts();
			updateCharts();
		},600);

		var listenner = $rootScope.$on("SYNC_CHART",function(events,args){
			updateCharts();
		});
		$scope.$on('$destroy', listenner);
	}
})();