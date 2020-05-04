/**
 * Prototype que adiciona dias
 * param {int} days dias que serão adicionados
 */
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
var date = new Date();
var dataAtual = date.addDays(5);