(function () {
	'use strict';

	angular.module('BlurAdmin.pages.graficos')
	.service('graficoService', graficoService);

	function graficoService($http,ENDPOINT_API,
					$filter,$log, $q,$rootScope,$interval) {
		var path = "grafico";
		var url = ENDPOINT_API+path;
		var serviceChart = this;
		serviceChart.dataInicial=format(new Date());
		serviceChart.dataFinal=format(new Date());

		function update(){
			$http.get(url+"/"+serviceChart.dataInicial+"/"+serviceChart.dataFinal).then(function(response){
				serviceChart.data=response.data;
				$rootScope.$emit("SYNC_CHART",{});
			});
		}update();

		serviceChart.update=function(dataInicial,dataFinal){
			if(dataInicial!==undefined && dataFinal!==undefined){
				serviceChart.dataInicial=format(dataInicial);
				serviceChart.dataFinal=format(dataFinal);
				$log.info(dataInicial);
			}else{
				$log.error("Erro com as datas");
			}
			update();
		}

		function format(date){
			return $filter('date')(date, 'MM/dd/yyyy');
		}
		$interval(update,60000);
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


		//var socket = io.connect(ENDPOINT_URL);
		/*var socket = io.connect(ENDPOINT_URL,{'transports': ['websocket', 'polling']});
		socket.on('chartUpdate', function (data) {
			serviceChart.data=data;
			$rootScope.$emit("SYNC_CHART",{});
			console.log("recebeu");
		});*/