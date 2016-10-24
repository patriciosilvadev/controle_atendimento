(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
  .service('graficoService', graficoService);

  function graficoService($http,ENDPOINT_URI,$q) {
    var path = "grafico";
    var url = ENDPOINT_URI +path;
    var serviceChart = this;
    this.data={
      atendimentoAno:0,
      atendimentoMes:0,
      destaques:[]
    };
    this.update = function () {
      var deferred = $q.defer();
      $http.get(url+"/2016/10").then(function(response){
        serviceChart.data=response.data;
        deferred.resolve();
      },function(erro){
        deferred.reject(erro);
      });
      return deferred.promise;
    };
    serviceChart.update();
  }
})();