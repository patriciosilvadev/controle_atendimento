/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('graficosPieChartCtrl', graficosPieChartCtrl);

  /** @ngInject */
  function graficosPieChartCtrl($scope, $timeout, baConfig, baUtil) {

$scope.percent = 20;
        $scope.options = {
            animate:{
                duration:200,
                enabled:true
            },
            barColor:'#2C3E50',
            scaleColor:true,
            lineWidth: 9,
            lineCap: 'round',
            easing: 'easeOutBounce',
            trackColor: 'rgba(0,0,0,0)',
            size: 84,
            scaleLength: 0,
            animation: 2000
        };


    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
      color: pieColor,
      description: 'Atendimentos Ano',
      stats: '50000',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Atendimentos Mês',
      stats: '10000',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Visitas/Chamados - Mes',
      stats: '2000',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Destaque do Mes',
      stats: '32,592',
      icon: 'face',
    }
    ];

    
  }
})();