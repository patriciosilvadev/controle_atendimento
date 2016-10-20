'use strict';

var app = angular.module('BlurAdmin', [
  'constants',
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