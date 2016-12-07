/**
 * @author Vitor Silva Lima
 * created on 16.12.2015
 */
(function () {
  'use strict';

	angular.module('BlurAdmin.pages.grafico.geral')
    .directive('destaques', destaques);

	/** @ngInject */
	function destaques() {
		return {
		restrict: 'E',
		scope: {
			tipo: '@tipo'
		},
		controller: 'destaquesCtrl',
		templateUrl: 'app/pages/graficos/graficoGeral/destaques/destaques.html'
		};
  }
})();