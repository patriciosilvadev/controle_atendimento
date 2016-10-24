/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('destaquesCtrl', destaquesCtrl);

  /** @ngInject */
  function destaquesCtrl($scope,$interval,graficoService) {
    $scope.destaques=[];
    function updateCharts(){
            $scope.destaques=graficoService.data.destaques;
            calcPercentage();
    };
    updateCharts();
    function calcPercentage(){
      var totalMes=graficoService.data.atendimentoMes;
      for(var i=0;i<$scope.destaques.length;i++){
        $scope.destaques[i].porcentagem=((100/totalMes)*$scope.destaques[i].total);
      }
    }
    var stop =$interval(updateCharts,2000);
    $scope.$on('$destroy', function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
    });
  }
})();