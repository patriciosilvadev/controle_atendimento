angular.module('BlurAdmin').factory("AuthService",function($rootScope){
  $rootScope.isLogged=true;
  return{
    getName:function(){
      return "teste";
    },
    isLogged:function(){
      return false;
    }
  }
})