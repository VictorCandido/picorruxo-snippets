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