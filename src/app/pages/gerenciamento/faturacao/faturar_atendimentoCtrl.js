/**
 * @author Vitor Silva Lima <vitor.lima2@fatec.sp.gov.br>
 * created on 07/08/2016
 */
(function () {
  'use strict';
  /**
   * Modulo de cadastro de usuario
   */
  angular.module('BlurAdmin.pages.gerenciamento.faturamentoAtendimento')
    .controller('faturamentoCtrl', faturamentoCtrl);
  /**
   * Controle para o cadastro de usuario
   */
  function faturamentoCtrl($filter,$scope,$http,faturamentoService,$q,$timeout,$log) {




function weekCount(year, month_number) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}
console.log(weekCount(2016,11));

    $scope.faturas={};
    function atualizaDados(){
        faturamentoService.all().then(function (response) {
            $scope.faturas = response.data;
        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }atualizaDados();
    $scope.formataData=function(date){
        return $filter('date')(date, 'dd/MM/yyyy');
    };
    /**
     * Pega Numero
     */
    function getNumber(str){
        str+="";
        return str.replace(/[^\d]/g, '').slice(0, 14)
    }
    /**
     * Aplica Mascara
     */
    function applyMask(str){
        var number = getNumber(str);
        var cnpj = new StringMask('00.000.000\/0000-00');
        var cpf = new StringMask('000.000.000-00');
        var mascara ="";
        if(number.length>11){
            mascara = cnpj.apply(number);
        }else{
            mascara = cpf.apply(number);
        }
        return mascara.trim().replace(/[^0-9]$/, '');
    }

    $scope.faturar=function(numeroAtendimento){
        $log.info("faturando "+numeroAtendimento);
    }

    /**
     * Faz o binding para o scope
     */
    $scope.applyMask=applyMask;

  }

})();