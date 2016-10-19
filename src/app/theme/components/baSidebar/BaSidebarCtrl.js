/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  // function BaSidebarCtrl($scope, baSidebarService) {
  function BaSidebarCtrl($scope, baSidebarService,$state) {

    $scope.menuItems = baSidebarService.getMenuItems();
    $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

    $scope.showItem=function(nome){
      var state=$state.get(nome) || undefined;
      /*if (!angular.isFunction(state.data.rule)){
        return false;
      }*/
      if(state.data!==undefined){
        console.log(state.data);
      }
      else{
        return false;
      }
      console.log(state);
      return true;
    }

    $scope.hoverItem = function ($event) {
      $scope.showHoverElem = true;
      $scope.hoverElemHeight =  $event.currentTarget.clientHeight;
      var menuTopValue = 66;
      $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
      if (baSidebarService.canSidebarBeHidden()) {
        baSidebarService.setMenuCollapsed(true);
      }
    });
  }
})();