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

app.run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(e, to) {
    console.log(e);
    /*if (!angular.isFunction(to.data.rule)) return;
    var result = to.data.rule($currentUser);

    if (result && result.to) {
      e.preventDefault();
      // Optionally set option.notify to false if you don't want 
      // to retrigger another $stateChangeStart event
      $state.go(result.to, result.params, {notify: false});
    }*/
  });
});


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