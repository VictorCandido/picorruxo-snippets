habilitaCampo('funci_recibo_ferias', 'dia_recibo_ferias_F')

/**
 * FUNÇÃO PARA HABILITAR CAMPOS QUANDO CHECK FOR CHECADO
 * @param {*} idcheck 
 * @param {*} idcampo 
 * @author Rafael Oliveira
 */
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

/**
 * FUNÇÃO PARA SOMENTE NUMEROS
 * @param {*} num 
 * @author ?
 */
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
 * @author Víctor Cândido
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

/**
 * Exemplo para adicionar nome do usuário logado em um campo.
 * @param {*} form Campos do formulário
 * @param {*} customHTML 
 * @author Claison Oliveira
 */
function displayFields(form, customHTML) {
    var usuarioId = getValue("WKUser");
    var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", usuarioId, usuarioId, ConstraintType.MUST);
    var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
    var usuario = datasetAttachment.getValue(0, "colleagueName");
    form.setValue("NOME_DO_CAMPO", usuario);
}

/**
 * Faz uma consulta de dataset retornando valores dentro do campo PaiFilho
 * 
 * @param {string} datasetFormulario - Nome do dataset do formulário
 * @param {string} tableName - Nome da tabela PaiFilho
 * @param {Array Objetos} constraints - Array de Objetos [{name: NOME_DO_CAMPO,value: VALOR_FILTRO,}]
 * @author Nicolas Guimarães
 */
function pegarDadosPaiFilho(datasetFormulario, tableName, constraints = []) {
    var constraintsFilhos = DatasetFactory.createConstraint("tablename", tableName, tableName, ConstraintType.MUST);
    var constraintsFinal = new Array()
    constraintsFinal.push(constraintsFilhos)
    if (constraints.length != 0) {
        for (var i = 0; i < constraints.length; i++) {
            constraintsFinal.push(DatasetFactory.createConstraint(constraints[i].name, constraints[i].value, constraints[i].value, ConstraintType.MUST))
        }
    }
    return DatasetFactory.getDataset(datasetFormulario, null, constraintsFinal, null).values;
}

/**
 * Retorna data atual em string
 * @author Nicolas Guimarães
 */
function getTodayDate() {
    let data = new Date;
    var dataString = "" + ((parseInt(data.getDate()) < 10) ? "0" + data.getDate() : data.getDate()) + "/" + (((parseInt(data.getMonth()) + 1) < 10) ? "0" + (parseInt(data.getMonth()) + 1) : data.getMonth() + 1) + "/" + data.getFullYear() + ""
    return dataString
}