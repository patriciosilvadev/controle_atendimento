/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .directive('graficosPieChart', graficosPieChart);

  /** @ngInject */
  function graficosPieChart() {
    return {
      restrict: 'E',
      controller: 'graficosPieChartCtrl',
      templateUrl: 'app/pages/graficos/graficosPieChart/graficosPieChart.html'
    };
  }
})();