/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.geral')
      .directive('graficosPieChart', graficosPieChart);

  /** @ngInject */
  function graficosPieChart() {
    return {
      restrict: 'E',
      scope: {
			  tipo: '@tipo'
	  	},
      controller: 'graficosPieChartCtrl',
      templateUrl: 'app/pages/graficos/graficoGeral/graficosPieChart/graficosPieChart.html'
    };
  }
})();