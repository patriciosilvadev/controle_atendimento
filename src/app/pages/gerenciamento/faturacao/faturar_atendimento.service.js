/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.faturamentoAtendimento')
    .factory('faturamentoService', faturamentoService);

  /** @ngInject */
  function faturamentoService($http,ENDPOINT_API,$log) {
    var path = "faturamento";
    var url = ENDPOINT_API +path;
    var date=new Date();
    function all(data){
      date = data;
      $log.debug("Retrieving by Year: "+date.getFullYear()+" Month: "+(date.getMonth()));
      return $http.get(url+"/"+date.getFullYear()+"/"+(date.getMonth()));
    }
    function put(item) {
      return $http.put(url+"/"+item.id,item);
    };
    return {
      all:all,
      put:put
    };
  }
})();