/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('TotalTipoChartCtrl', TotalTipoChartCtrl);

  /** @ngInject */
  function TotalTipoChartCtrl($scope, baConfig, colorHelper,graficoService, $interval) {
    $scope.totalMes=0;
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
        //animateRotate: true if want to animate
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
    var stop =$interval(updateCharts,5000);
    $scope.$on('$destroy', function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
    });
    updateCharts();
    function createItem(value,porcentagem,descricao,item){
      return {
        value: value,
        color: dashboardColors[item],
        highlight: dashboardColors[item],
        label: descricao,
        porcentagem: porcentagem,
        order: item,
      };
    }
    function calcPercentage(total,value){
      return (100/total)*value;
    }
  }
})();