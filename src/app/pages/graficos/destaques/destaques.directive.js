/**
 * @author Vitor Silva Lima
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.graficos')
      .directive('destaques', destaques);

  /** @ngInject */
  function destaques() {
    return {
      restrict: 'E',
      controller: 'destaquesCtrl',
      templateUrl: 'app/pages/graficos/destaques/destaques.html'
    };
  }
})();