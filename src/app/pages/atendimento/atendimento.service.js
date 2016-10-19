(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento.service',[])
  .factory('atendimentoService', atendimentoService);

  /** @ngInject */
  function atendimentoService($http,ENDPOINT_URI) {
    var path = "atendimento";
    var url = ENDPOINT_URI +path;
    function all(){
      return $http.get(url);
    }
    function create(item) {
      return $http.post(url, item);
    };
    function update(item) {
      return $http.post(url, item);
    };
    function deleta(item) {
      return $http.post(url, item);
    };
    function getAtendimentoTipos(){
            return $http.get(ENDPOINT_URI+"tipoAtendimento");
    }   
    return {
      all:all,
      create:create,
      update:update,
      deleta:deleta,
      getAtendimentoTipos:getAtendimentoTipos
    };
  }
})();