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