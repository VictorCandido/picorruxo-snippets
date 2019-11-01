habilitaCampo('funci_recibo_ferias', 'dia_recibo_ferias_F')

//FUNÇÃO PARA HABILITAR CAMPOS QUANDO CHECK FOR CHECADO
function habilitaCampo(idcheck, idcampo) {
    $('#' + idcheck).change(function () {
        var valCheck = $('#' + idcheck).is(':checked')
        if (valCheck == true) {
            $('#' + idcampo).prop('readonly', false)
        } else {
            $('#' + idcampo).prop('readonly', true)
            $('#' + idcampo).val('')
        }
    })
}
//FUNÇÃO PARA SOMENTE NUMEROS
function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}

/**
 * Função que retorna se o codigo está sendo executando em um sistema mobile ou não.
 */
function detectar_mobile() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}