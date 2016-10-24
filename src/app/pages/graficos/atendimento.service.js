(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos.service',[])
  .factory('graficoService', graficoService);

  /** @ngInject */
  function graficoService($http,ENDPOINT_URI) {
    var path = "atendimentos";
    var url = ENDPOINT_URI +path;

    function all(){
            return $http.get(ENDPOINT_URI+"/2016/Oct");
    }
    return {
      all:all,
    };
  }
})();