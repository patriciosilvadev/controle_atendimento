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
  							$interval, baConfig, baUtil) {
    /**
     * create variables
     */
    $scope.charts=[];
    $scope.percent=30;
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
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
    $scope.charts.push(createChar('Atendimentos Ano','person'));
    $scope.charts.push(createChar('Atendimentos Mês','person'));
    $scope.charts.push(createChar('Visitas/Chamados - Mes','face'));
    $scope.charts.push(createChar('Destaque do Mes','face'));


    $rootScope.$on("SYNC_CHART",function(events,args){
		updateCharts();
		console.log("updated chart");
    });
    function updateCharts(){
            var data=graficoService.data;
            //update Atendimento por ano
            $scope.charts[0].stats=data.atendimentoAno;
            $scope.charts[0].percent=calcPercentage(data.atendimentoAno,data.atendimentoAno);
            //update Atendimento por Mês
            $scope.charts[1].stats=data.atendimentoMes;
            $scope.charts[1].percent=calcPercentage(data.atendimentoAno,data.atendimentoMes);
            //update 
           $scope.charts[3].stats=data.destaques[0].total;
            $scope.charts[3].description="Destaque do Mes" + data.destaques[0].nome;
            $scope.charts[3].percent=calcPercentage(data.atendimentoMes,data.destaques[0].total);
			
	};
    
    function createChar(description,icon){
      return {
        color:pieColor,
        description:description,
        stats:0,
        icon:icon,
        percent:0
      };
    }
    function calcPercentage(total,value){
      return (100/total)*value;
    }




  }
})();