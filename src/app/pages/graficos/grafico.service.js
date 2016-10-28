(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
  .service('graficoService', graficoService);

  function graficoService($http,ENDPOINT_URI,$q,$rootScope) {
    var path = "grafico";
    var url = ENDPOINT_URI +path;
    var serviceChart = this;
    var socket = io.connect('http://localhost:4000');
    socket.on('chartUpdate', function (data) {
		serviceChart.data=data;
		$rootScope.$emit("SYNC_CHART",{});
    });
    this.data={
      atendimentoAno:0,
      atendimentoMes:0,
      destaques:[],
      porTipo:[]
    };
  }
})();