/**
 * @author a.demeshko
 * created on 12/18/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gerenciamento.graficos', [])
    .config(routeConfig).config(function(baConfigProvider){
      var layoutColors = baConfigProvider.colors;
      Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
      Morris.Donut.prototype.defaults.labelColor = layoutColors.defaultText;
      Morris.Grid.prototype.gridDefaults.gridLineColor = layoutColors.borderDark;
      Morris.Grid.prototype.gridDefaults.gridTextColor = layoutColors.defaultText;
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('gerenciamento.graficos', {
          url: '/graficos',
          templateUrl: 'app/pages/gerenciamento/graficos/graficos.html',
          title: 'Graficos',
          sidebarMeta: {
            order: 300,
          }
        });
  }

})();