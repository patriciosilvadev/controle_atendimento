/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('graficosPieChartCtrl', graficosPieChartCtrl);

  /** @ngInject */
  function graficosPieChartCtrl($scope, graficoService,$rootScope,
							baConfig, baUtil,$timeout) {
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

		$scope.charts.push(createChar('Atendimentos Ano','person'));
		$scope.charts.push(createChar('Atendimentos Mês','person'));
		$scope.charts.push(createChar('Visitas - Mes','face'));
		$scope.charts.push(createChar('Destaque do Mes','face'));
		
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
			var data=graficoService.data;
			//update Atendimento por ano
			$scope.charts[0].stats=data.atendimentoAno;
			$scope.charts[0].percent=calcPercentage(data.atendimentoAno,data.atendimentoAno);
			//update Atendimento por Mês
			$scope.charts[1].stats=data.atendimentoMes;
			$scope.charts[1].percent=calcPercentage(data.atendimentoAno,data.atendimentoMes);
			//update
			var destaqueTotal=0;
			$scope.charts[3].stats=data.destaques[0].total||0;
			$scope.charts[3].description="Destaque do Mes"
			$scope.charts[3].percent=calcPercentage(data.atendimentoMes,(data.destaques[0].total || 0));

			$('.pie-charts .chart').each(function(index, chart) {
				$(chart).data('easyPieChart').update($scope.charts[index].percent);
			});
		};

		$timeout(function(){
			loadPieCharts();
			updateCharts();
		},600);

		$rootScope.$on("SYNC_CHART",function(events,args){
			updateCharts();
		});
	}
})();