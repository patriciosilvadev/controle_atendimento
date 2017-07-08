(function () {
  'use strict';
	angular.module('BlurAdmin')
	.factory('Util',Util); 
	/**
	 * 
	 */
	function Util($http,ENDPOINT_API,$log,$q) {
		var utilService = {};
		var url = ENDPOINT_API + "utils"
        utilService.tipo_acesso=[];
        utilService.status=[];
        utilService.tipo_atendimento=[];
        var atualizou = false;

        utilService.atualiza=function(){
            var deferred = $q.defer();
            if(atualizou){
                deferred.resolve();
            }else{
                $http.get(url).then(function(response){
                    var data = response.data;
                    utilService.tipo_acesso=data.tipo_acesso;
                    utilService.status=data.status;
                    utilService.tipo_atendimento=data.tipo_atendimento;
                    atualizou=true;
                    deferred.resolve();      
                },function(error){
                    $log.debug("Aconteceu um erro ao tentar pegar utils!!!");
                    deferred.reject();
                });
            }
            return deferred.promise;
        };


        utilService.clone=function(obj) {
			if (null == obj || "object" != typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			}
			return copy;
		};

		return utilService;
	}
})();