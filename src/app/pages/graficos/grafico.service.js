(function () {
	'use strict';

	angular.module('BlurAdmin.pages.graficos')
	.service('graficoService', graficoService);

	function graficoService($http,ENDPOINT_API,$q,$rootScope,$interval) {
		var path = "grafico";
		var url = ENDPOINT_API+path;
		var serviceChart = this;
		//var socket = io.connect(ENDPOINT_URL);
		/*var socket = io.connect(ENDPOINT_URL,{'transports': ['websocket', 'polling']});
		socket.on('chartUpdate', function (data) {
			serviceChart.data=data;
			$rootScope.$emit("SYNC_CHART",{});
			console.log("recebeu");
		});*/
		function update(){
			$http.get(url+"/2016/11").then(function(response){
				serviceChart.data=response.data;
				$rootScope.$emit("SYNC_CHART",{});
				console.log("recebeu");
			});
		}update();
		$interval(update,5000);
		this.data={
			atendimentoAno:0,
			atendimentoMes:0,
			destaques:[{total:0}],
			porTipo:[]
		};
	}
})();