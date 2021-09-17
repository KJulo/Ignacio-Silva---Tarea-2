import jquery = require('jquery');
const $:JQueryStatic=jquery;


$("#opinionEscuela").on('keyup', function(){
    let texto:any = $(this),
        charCurrent = $("#current"),
        charMaximum = $("#maximum"),
        charCount = texto.val().length;
        charCurrent.text(charCount);
        
        charCurrent.removeClass ("text-danger");
        charMaximum.removeClass ("text-danger");
        charCurrent.removeClass ("text-warning");
        charMaximum.removeClass ("text-warning");

    if (charCount > 300 && charCount < 400){
        charCurrent.addClass ("text-warning");
        charMaximum.addClass ("text-warning");
    }
    if (charCount >= 400){
        charCurrent.addClass ("text-danger");
        charMaximum.addClass ("text-danger");
    }
})



$("#enviarFormulario").on('click', function(event:any){
    let flagLengPref:boolean = false,
    flagRamoDif:boolean = false,
    flagExpProg:boolean = false,
    flagRamoDifOtro:boolean = false,
    flagForm:boolean = false,
    flagNombre:boolean = true,
    flagRut:boolean = true,
    flagMail:boolean = true,
    flagTel:boolean = true,
    flagLenguajePref:boolean = false,
    flagXpProg:boolean = false,
    flagCursoDif:boolean = false,
    flagOpinionEscuela:boolean = false;
    event.preventDefault();
    $("#formulario input").each(function(index){
        let input = $(this);
        //console.log(input.attr("type"));
        //console.log($("#opinionRamoDificil").val());        
        if (input.val() == ""){
            toInvalid(input);
            if (input.attr("id") == "nombreCompleto") flagNombre = false;
            if (input.attr("id") == "rut") flagRut = false;
            if (input.attr("id") == "correoElectronico") flagMail = false;
            if (input.attr("id") == "telefonoMovil") flagTel = false;
        }else{    
            toValid(input);
            switch (input.attr("type")){
                case "text":{
                    if (input.attr("id") == "rut"){
                        if (Fn.validaRut(input.val()) == false){
                            toInvalid(input);
                            flagRut = false;
                            break;
                        }
                    }
                    break;
                }

                case "email":{
                    if (checkMail(input.val()) == false){
                        toInvalid(input);
                        flagMail = false;
                        break;
                    }
                    break;
                }

                case "number":{
                    if (checkTel(input.val()) == false){
                        toInvalid(input);
                        flagTel = false;
                        break;
                    }
                    break;
                }
                
                case "checkbox":{
                    
                    switch (input.attr("id")){
                        case "lenguajesPreferidos": {
                            if (input.is(":checked")) flagLengPref = true;
                            if (flagLengPref == true){
                                $("#lenguajeInteres div input").each(function(){
                                    toValid(($(this)));
                                })
                                flagLenguajePref = true;
                                break;
                            }
    
                            $("#lenguajeInteres div input").each(function(){
                                toInvalid(($(this)));
                            });
                            
                            break;
                        }
                        
                        case "ramoDificil": {
                            if (input.is(":checked")){
                                if (input.attr("name") == "otro"){
                                    if ($("#opinionRamoDificil").val() == ""){
                                        flagRamoDifOtro = false;
                                        flagRamoDif = false;
                                    }else{
                                        flagRamoDifOtro = true;
                                    }
                                }else{
                                    flagRamoDif = true;
                                }
                            
                            
                            }




                            if (flagRamoDif == true || flagRamoDifOtro == true){
                                $("#ramoDif input").each(function(){
                                    toValid(($(this)));
                                })
                                flagCursoDif = true;
                                break;
                            }

                            $("#ramoDif input").each(function(){
                                toInvalid(($(this)));
                            })
                            flagCursoDif = false;
                        }
                    }
                    break;

                }
                
                case "radio": {
                    $("#nivelXp div input").each(function(){
                        toInvalid(($(this)));
                        flagForm = false;
                    })
                    if (input.is(":checked")) flagExpProg = true;
                    if (flagExpProg == true){
                        $("#nivelXp div input").each(function(){
                            toValid(($(this)));
                        })
                        flagXpProg = true;
                        break;
                    }
                    break;
                }
            }
        }
    });

    if ($("#opinionEscuela").val() != ""){
        flagOpinionEscuela = true;
    }
    
    console.clear();
    console.log("Flag nombre: "+flagNombre);
    console.log("Flag rut: "+flagRut);
    console.log("Flag mail: "+flagMail);
    console.log("Flag Telefono: "+flagTel);
    console.log("Flag lenguajes preferidos: "+flagLenguajePref);
    console.log("Flag nivelXp: "+flagXpProg);
    console.log("Flag curso mas dificil: "+flagCursoDif);
    console.log("Flag opinion escuela: "+flagOpinionEscuela);


    if (flagNombre == true && flagRut == true && flagMail == true && flagTel == true && flagLenguajePref != false && !flagXpProg != true && flagCursoDif != false && flagOpinionEscuela == true){
        console.log("formulario Completo");
    }
});

//@Author: Cesar Gonzalez
//@Function: Encargado de verificar el rut y que efectivamente corresponde a un rut existente.
let Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto:any) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T:any){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}



function toValid(input:any){
    input.removeClass("is-invalid");
    input.addClass("is-valid");
}

function toInvalid(input:any){
    input.removeClass("is-valid");
    input.addClass("is-invalid");
}



function checkTel(tel:any){
    if (tel.length >9 || tel.length <9) return false;
    return true;
}

function checkMail(email:any){
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}


$("#limpiarDatos").on("click", function(event:any){
    event.preventDefault();
    $("#formulario input").each(function(){
        let input=$(this);
        if (input.attr("type") == "text" && input.val()!="") input.val(""); 
        if (input.attr("type") == "email" && input.val()!="") input.val("");
        if (input.attr("type") == "number" && input.val()!="") input.val("");
        if (input.attr("type") == "checkbox" && input.is(":checked")) input.prop("checked", false);
        if (input.attr("type") == "radio" && input.val()!=1) input.val(1);
    })
    if ($("#opinionEscuela").val() != ""){
        $("#opinionEscuela").val("");
    }
})


