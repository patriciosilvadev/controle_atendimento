/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.grafico.geral')
      .directive('totalTipoChart', totalTipoChart);

  /** @ngInject */
  function totalTipoChart() {
    return {
      restrict: 'E',
      scope: {
			  tipo: '@tipo'
		  },
      controller: 'TotalTipoChartCtrl',
      templateUrl: 'app/pages/graficos/graficoGeral/totalPorTipo/totalTipo.html'
    };
  }
})();