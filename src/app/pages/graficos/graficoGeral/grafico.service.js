(function () {
	'use strict';

	angular.module('BlurAdmin.pages.grafico.geral')
	.service('graficoService', graficoService);

	function graficoService($http,ENDPOINT_API,
					$filter,$log, $q,$rootScope,$interval) {
		var path = "grafico";
		var url = ENDPOINT_API+path;
		var serviceChart = this;
		var dataInicial=new Date();
		//serviceChart.dataFinal=format(new Date());

		function update(){
			$http.get(url+"/"+dataInicial.getFullYear()+"/"+(dataInicial.getMonth())+"/"+dataInicial.getDate())
			.then(function(response){
				serviceChart.data=response.data;
				$rootScope.$emit("SYNC_CHART",{});
			});
		}update();

		serviceChart.update=function(dt){
			if(dt!==undefined){
				dataInicial=dt;
				$log.info(dataInicial);
				update();
			}else{
				$log.error("Erro com as datas");
			}
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
			por_tipo:[]
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