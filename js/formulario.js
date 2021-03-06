define(["require", "exports", "jquery"], function (require, exports, jquery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = jquery;
    $("#opinionEscuela").on('keyup', function () {
        var texto = $(this), charCurrent = $("#currentOpEsc"), charMaximum = $("#maximumOpEsc"), charCount = texto.val().length;
        charCurrent.text(charCount);
        charCurrent.removeClass("text-danger");
        charMaximum.removeClass("text-danger");
        charCurrent.removeClass("text-warning");
        charMaximum.removeClass("text-warning");
        if (charCount > 300 && charCount < 400) {
            charCurrent.addClass("text-warning");
            charMaximum.addClass("text-warning");
        }
        if (charCount >= 400) {
            charCurrent.addClass("text-danger");
            charMaximum.addClass("text-danger");
        }
    });
    $("#opinionRamoDificil").on('keyup', function () {
        var texto = $(this), charCurrent = $("#currentDifRamo"), charMaximum = $("#maximumDifRamo"), charCount = texto.val().length;
        charCurrent.text(charCount);
        charCurrent.removeClass("text-danger");
        charMaximum.removeClass("text-danger");
        charCurrent.removeClass("text-warning");
        charMaximum.removeClass("text-warning");
        if (charCount > 300 && charCount < 400) {
            charCurrent.addClass("text-warning");
            charMaximum.addClass("text-warning");
        }
        if (charCount >= 400) {
            charCurrent.addClass("text-danger");
            charMaximum.addClass("text-danger");
        }
    });
    $("#enviarFormulario").on('click', function (event) {
        if (verificarFormulario(event)) {
            window.location.href = "FormSuccess.html";
        }
        else {
            alert("Ingrese los datos en los campos requeridos");
        }
    });
    function verificarFormulario(event) {
        var flagLengPref = false, flagRamoDif = false, flagExpProg = false, flagRamoDifOtro = false, flagNombre = true, flagRut = true, flagMail = true, flagTel = true, flagLenguajePref = false, flagXpProg = false, flagCursoDif = false, flagOpinionEscuela = false;
        event.preventDefault();
        $("#formulario input").each(function (index) {
            var input = $(this);
            if (input.val() == "") {
                toInvalid(input);
                if (input.attr("id") == "nombreCompleto")
                    flagNombre = false;
                if (input.attr("id") == "rut")
                    flagRut = false;
                if (input.attr("id") == "correoElectronico")
                    flagMail = false;
                if (input.attr("id") == "telefonoMovil")
                    flagTel = false;
            }
            else {
                toValid(input);
                switch (input.attr("type")) {
                    case "text": {
                        if (input.attr("id") == "rut") {
                            if (checkRut(input.val()) == false) {
                                toInvalid(input);
                                flagRut = false;
                                break;
                            }
                        }
                        break;
                    }
                    case "email": {
                        if (checkMail(input.val()) == false) {
                            toInvalid(input);
                            flagMail = false;
                            break;
                        }
                        break;
                    }
                    case "number": {
                        if (checkTel(input.val()) == false) {
                            toInvalid(input);
                            flagTel = false;
                            break;
                        }
                        break;
                    }
                    case "checkbox": {
                        switch (input.attr("id")) {
                            case "lenguajesPreferidos": {
                                if (input.is(":checked"))
                                    flagLengPref = true;
                                if (flagLengPref == true) {
                                    $("#lenguajeInteres div input").each(function () {
                                        toValid(($(this)));
                                    });
                                    flagLenguajePref = true;
                                    break;
                                }
                                $("#lenguajeInteres div input").each(function () {
                                    toInvalid(($(this)));
                                });
                                break;
                            }
                            case "ramoDificil": {
                                if (input.is(":checked")) {
                                    if (input.attr("name") == "otro") {
                                        if ($("#opinionRamoDificil").val() == "") {
                                            flagRamoDifOtro = false;
                                            flagRamoDif = false;
                                            toInvalid($("#opinionRamoDificil"));
                                        }
                                        else {
                                            flagRamoDifOtro = true;
                                            toValid($("#opinionRamoDificil"));
                                        }
                                    }
                                    else {
                                        flagRamoDif = true;
                                    }
                                }
                                if (flagRamoDif == true || flagRamoDifOtro == true) {
                                    $("#ramoDif input").each(function () {
                                        toValid(($(this)));
                                    });
                                    flagCursoDif = true;
                                    break;
                                }
                                $("#ramoDif input").each(function () {
                                    toInvalid(($(this)));
                                });
                                flagCursoDif = false;
                            }
                        }
                        break;
                    }
                    case "radio": {
                        if (input.is(":checked"))
                            flagExpProg = true;
                        if (flagExpProg == true) {
                            $("#nivelXp input").each(function () {
                                toValid(($(this)));
                            });
                            flagXpProg = true;
                            break;
                        }
                        $("#nivelXp input").each(function () {
                            toInvalid(($(this)));
                        });
                        break;
                    }
                }
            }
        });
        toInvalid($("#opinionEscuela"));
        if ($("#opinionEscuela").val() != "") {
            flagOpinionEscuela = true;
            toValid($("#opinionEscuela"));
        }
        if (flagNombre == true && flagRut == true && flagMail == true && flagTel == true && flagLenguajePref != false && !flagXpProg != true && flagCursoDif != false && flagOpinionEscuela == true) {
            return true;
        }
        return false;
    }
    ;
    function toValid(input) {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
    }
    function toInvalid(input) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
    }
    function checkRut(rut) {
        if (rut.length < 4 || rut.length > 10 || rut[rut.length - 2] != "-" || rut.includes("."))
            return false;
        return true;
        //10-1
    }
    function checkTel(tel) {
        if (tel.length > 9 || tel.length < 9)
            return false;
        return true;
    }
    function checkMail(email) {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }
    $("#limpiarDatos").on("click", function (event) {
        event.preventDefault();
        $("#formulario input").each(function () {
            var input = $(this);
            if (input.attr("type") == "text" && input.val() != "")
                input.val("");
            if (input.attr("type") == "email" && input.val() != "")
                input.val("");
            if (input.attr("type") == "number" && input.val() != "")
                input.val("");
            if (input.attr("type") == "checkbox" && input.is(":checked"))
                input.prop("checked", false);
            if (input.attr("type") == "radio" && input.is(":checked"))
                input.prop("checked", false);
            if (input.attr("type") == "range" && input.val() != 1)
                input.val(1);
        });
        if ($("#opinionEscuela").val() != "") {
            $("#opinionEscuela").val("");
        }
        if ($("#opinionRamoDificil").val() != "") {
            $("#opinionRamoDificil").val("");
        }
    });
});
