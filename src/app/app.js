'use strict';

var app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);
app.constant('ENDPOINT_URI', 'http://localhost:4000/api/');

app.factory("loginService",function($rootScope){
  $rootScope.isLogged=true;
  return{
    getName:function(){
      return "teste";
    },
    isLogged:function(){
      return false;
    }
  }
});