/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .controller('graficosCtrl', graficosCtrl);

  /** @ngInject */
    function graficosCtrl($scope, graficoService,$rootScope,
                        baConfig, baUtil,$timeout,$log) {
        //options for data
        $scope.dataOptions={
            datepickerMode:'month',
            //minMode:'month'
        };
        $scope.date={};
        $scope.date2={};
        $scope.open=function(n){
            if(n==1){
                $scope.date.opened=!$scope.date.opened;
            }else{
                $scope.date2.opened=!$scope.date2.opened;
            }
        };

    }
})();