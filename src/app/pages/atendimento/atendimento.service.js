(function () {
  'use strict';

  angular.module('BlurAdmin.pages.atendimento.service',[])
  .factory('formata',function(){
     var exp="";
        //valida numero inteiro com mascara
        function mascaraInteiro(){
                if (event.keyCode < 48 || event.keyCode > 57){
                        event.returnValue = false;
                        return false;
                }
                return true;
        }
      function formataCampo(campo, Mascara, evento) { 
        var boleanoMascara; 

        var Digitato = evento.keyCode;
        exp = /\-|\.|\/|\(|\)| /g
       // campo = document.getElementById('cnpj');
        var campoSoNumeros = campo.toString().replace( exp, "" ); 

        var posicaoCampo = 0;    
        var NovoValorCampo="";
        var TamanhoMascara = campoSoNumeros.length;; 

        if (Digitato != 8) { // backspace 
                for(var i=0; i<= TamanhoMascara; i++) { 
                        var boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                                || (Mascara.charAt(i) == "/")) 
                        boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                        if (boleanoMascara) { 
                                NovoValorCampo += Mascara.charAt(i); 
                                    TamanhoMascara++;
                        }else { 
                                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                                posicaoCampo++; 
                            }              
                    }      
                campo = NovoValorCampo;
                    return true; 
        }else { 
                return true; 
        }
      }
      function mascaraCNPJ(cnpj){
              console.log(cnpj);
        if(mascaraInteiro(cnpj)==false){
                event.returnValue = false;
        }       
        return formataCampo(cnpj, '00.000.000/0000-00', event);
      }
      return{
          formataCampo:formataCampo,
          mascaraCNPJ:mascaraCNPJ
      };
  });

})();