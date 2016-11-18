(function () {
	'use strict';

	angular.module('BlurAdmin.pages.graficosFaturamento')
	.service('graficosFaturamentoService', graficosFaturamentoService);

	function graficosFaturamentoService($http,ENDPOINT_API,
					$filter,$log, $q,$rootScope,$interval) {
		var path = "graficoFaturamento";
		var url = ENDPOINT_API+path;
		var serviceChart = this;
		serviceChart.date=format(new Date());
		//var socket = io.connect(ENDPOINT_URL);
		/*var socket = io.connect(ENDPOINT_URL,{'transports': ['websocket', 'polling']});
		socket.on('chartUpdate', function (data) {
			serviceChart.data=data;
			$rootScope.$emit("SYNC_CHART",{});
			console.log("recebeu");
		});*/
		function update(){
			/*$http.get(ENDPOINT_API+"graficoTeste/"+serviceChart.date).then(function(response){
				console.log("recebeu");
			});*/

			$http.get(url+"/"+serviceChart.date).then(function(response){
				serviceChart.data=response.data;
				$rootScope.$emit("SYNC_CHART",{});
			});
		}update();
		serviceChart.update=function(date){
			serviceChart.date=date;
		}
		function format(date){
			return $filter('date')(date, 'MM/dd/yyyy');
		}
		$interval(update,5000);
		serviceChart.data={
			total_ano:0,
			total_visitas:0,
			total_mes:0,
			total_semana:0,
			destaques:[{total:0}],
			porTipo:[]
		};
	}
})();