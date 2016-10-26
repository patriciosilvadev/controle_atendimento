/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .directive('totalTipoChart', totalTipoChart);

  /** @ngInject */
  function totalTipoChart() {
    return {
      restrict: 'E',
      controller: 'TotalTipoChartCtrl',
      templateUrl: 'app/pages/graficos/totalPorTipo/totalTipo.html'
    };
  }
})();