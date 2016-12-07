(function () {
	'use strict';

	angular.module('BlurAdmin.pages.grafico.faturamento')
	.service('graficosFaturamentoService', graficosFaturamentoService);

	function graficosFaturamentoService($http,ENDPOINT_API,
					$filter,$log, $q,$rootScope,$interval) {
		var path = "graficoFaturamento";
		var url = ENDPOINT_API+path;
		var serviceChart = this;
		var dataInicial=new Date();
		serviceChart.dataFinal=format(new Date());

		function update(){
			$http.get(url+"/"+dataInicial.getFullYear()+"/"+(dataInicial.getMonth()+1)+"/"+dataInicial.getDate())
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

		$interval(update,50000);
		
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