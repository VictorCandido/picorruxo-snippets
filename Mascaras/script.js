/**
 * Função que adiciona máscara de moedas ao campo inserido.
 * @param {string} campo Campo a receber máscara
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