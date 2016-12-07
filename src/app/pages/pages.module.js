/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
	'use strict';

	angular.module('BlurAdmin.pages', [
		'ui.router',
		'BlurAdmin.pages.dashboard',
		'BlurAdmin.pages.ui',
		//'BlurAdmin.pages.components',
		'BlurAdmin.pages.form',
		'BlurAdmin.pages.tables',
		'BlurAdmin.pages.charts',
		'BlurAdmin.pages.gerenciamento',
		'BlurAdmin.pages.grafico',
	 // 'BlurAdmin.pages.maps',
		'BlurAdmin.pages.profile',
		'BlurAdmin.pages.atendimento'
	])
	.config(routeConfig);

	/** @ngInject */
	function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
		$urlRouterProvider.otherwise('/atendimento');

		baSidebarServiceProvider.addStaticItem({
			title: 'Menu Level 1',
			icon: 'ion-ios-more',
			subMenu: [{
				title: 'Menu Level 1.1',
				disabled: true
			}, {
				title: 'Menu Level 1.2',
				subMenu: [{
					title: 'Menu Level 1.2.1',
					disabled: true
				}]
			}]
		});
	}

})();
