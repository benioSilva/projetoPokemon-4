var pokeImgId = "pokeImgTarget"
var preencherListaId = "preencherLista"
var tempPokeTargetKey = "tempPoke"

function getElementById(id) {
    return document.getElementById(id)
}

function getStorageTemp() {
    const storageTemp = localStorage.getItem(tempPokeTargetKey)
    return JSON.parse(storageTemp)
}



/*---------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
pokeTarget()

async function pokeTarget() {
    const storageTemp = getStorageTemp()
    console.log(storageTemp)
    getElementById(pokeImgId).innerHTML = ""
    await getMoveSet(storageTemp.nomeTempPoke)
    getElementById(pokeImgId).innerHTML +=
        '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
        '<div> <img src="' + storageTemp.imgTempPoke + '" alt="' + storageTemp.nomeTempPoke + '"></div>' +
        '<h6>' + storageTemp.nomeTempPoke + '</h6>' +
        '</div>'
}


async function getMoveSet(pokeNomeParam) {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeNomeParam + '')
    console.log(response.data.moves)
    getElementById(preencherListaId).innerHTML = ""
    response.data.moves.forEach(function (element, index) {
        getElementById(preencherListaId).innerHTML +=
            '<tr>' +
            '<th scope="row">'+(index+1)+'</th>' +
            '<td>'+element.move.name+'</td>' +
            '</tr>'
    });

}
/*---------------------------------------------- Funções dos Botões --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function btnRetornarLista(){
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%203/coreui-free-bootstrap-admin-template-main/dist/lista-geral-pokemons.html"
    localStorage.removeItem(tempPokeTargetKey)
}

function btnRetornarTimes(){
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%203/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-times.html"
    localStorage.removeItem(tempPokeTargetKey)
}