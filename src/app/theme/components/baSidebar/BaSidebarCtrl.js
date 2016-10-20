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
  function BaSidebarCtrl($scope, baSidebarService,$state,AuthService,$timeout) {

    $scope.menuItems = baSidebarService.getMenuItems();
    $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
    function process(){
          for(var i=0;i < $scope.menuItems.length;i++){
            $scope.menuItems[i].authorized=AuthService.isAuthorized($scope.menuItems[i].authorizedRoles);
          }
    }
    if(AuthService.isAuthenticated()){
          process();
          console.log("logged!!!");
    }else{ 
       $timeout(function(){
         process();
       }, 2000);
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