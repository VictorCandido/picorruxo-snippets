/**
 * Função que adiciona máscara de moedas ao campo inserido.
 * @param {string} campo Campo a receber máscara
 * @author Víctor Cândido
 */
const mascaraMoeda = (campo) => {
    valor = campo.value;
    valor = valor.replace(/\D/g, ""); // permite digitar apenas numero
    valor = valor.replace(/(\d{1})(\d{14})$/, "$1.$2"); // coloca ponto antes dos ultimos digitos
    valor = valor.replace(/(\d{1})(\d{11})$/, "$1.$2"); // coloca ponto antes dos ultimos 11 digitos
    valor = valor.replace(/(\d{1})(\d{8})$/, "$1.$2"); // coloca ponto antes dos ultimos 8 digitos
    valor = valor.replace(/(\d{1})(\d{5})$/, "$1.$2"); // coloca ponto antes dos ultimos 5 digitos
    valor = valor.replace(/(\d{1})(\d{1,2})$/, "$1,$2"); // coloca virgula antes dos ultimos 2 digitos
    campo.value = valor;
}
/**
 * Função que retorna valor sem máscara.
 * @param {string} valor valor com mascara
 */
function tiraMaskMoeda(valor) {
    return parseInt(valor.toString().replace(/[.,]/g, ''));
}

/**
 * Recebe um número e retorna o mesmo em string com máscara de real
 * @param {number} numero Valor para ser retornado 
 * @author Nicolas Guimarães
 */
function numberToReal(numero) {
    if (numero < 0) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].replace('-', '')
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return '-' + numero.join(',');
    } else {
        var numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
}

/**
 * Recebe uma máscara de real e converte em número
 * @param {string} numero máscara para ser revertida em number
 * @author Nicolas Guimarães
 */
function realToNumber(numero) {
    return parseFloat(numero.replace(/\./g, '').replace(',', '.'))
}