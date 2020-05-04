/**
 * Função de consulta de um dataset que retorna uma promisse.
 * @param {string} dataset Valor do dataset a ser consultado
 * @param {[]} constraint Array de contraints para filtrar na consulta do dataset
 */
const getDataset = (dataset, constraint = []) => new Promise((resolve, reject) => {
    const datasetOptions = {
        name: dataset,
        fields: [],
        constraints: constraint,
        order: [],
    };

    fetch(window.location.origin + '/api/public/ecm/dataset/datasets', {
        method: 'POST',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(datasetOptions),
    }).then(response => response.json()).then((data) => {
        resolve(data);
    }).catch((error) => {
        reject(error);
    });
});

/**
 * Função que altera a descrição do processo
 * @param {string} description Valor do dataset a ser consultado
 * @param {int} id id do documento que sera atualizado
 */

var renomearArquivo = function (description, id) {
    var dados = {
        "id": id,//parent folder id  REQUIRED
        "description": description//document's description  REQUIRED

    };
    return $.ajax({
        method: "POST",
        url: "/api/public/ecm/document/updateDescription",
        data: JSON.stringify(dados),
        contentType: "application/json",
        async: false,
        error: function (x, e) {
            console.error("Atualizar Descrição")
            console.log(x);
            console.log(e);
            if (x.status == 500) {
                alert("renomearArquivo: Erro Interno do Servidor: entre em contato com o Administrador.");
            }
        }, beforeSend: function () {

        }
    });
};