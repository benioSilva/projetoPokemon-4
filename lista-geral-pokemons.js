var pokeApiLInk = 'https://pokeapi.co/api/v2/pokemon'
var preencherListaId = "preencherLista"
var preencherTimeId = "preencherTime"
var previousPage
var nextPage
var spinnerId = "spinner"
var lastPage
var tempPokeTargetKey = "tempPoke"
var timeAddKey = "timeAdd"
var btnSalvarId = "btnSalvar"
var btnExcluirId = "btnExcluir"
var divTimeAddId = "divTimeAdd"
var nomeTimeId = "nomeTime"
var btnCriarTimeId = "btnCriarTime"
var listaTimeKey = 'listaTime'
var editarKey = "editarTime"

initPage()

async function initPage() {
    limparDados()
    await loadPokeList(pokeApiLInk)
    toggleBtnAdd()
    limparDados()
    verficarSeExisteTimeParaEditar()
}

function getElementById(id) {
    return document.getElementById(id)
}


async function getSpritePokemon(pokeNomeParam) {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeNomeParam + '')
    return response.data.sprites.front_default
}

function getStorageAddTime() {
    const storageAddTime = localStorage.getItem(timeAddKey)
    return JSON.parse(storageAddTime) || []
}

function getStorageListaTime() {
    const listaTime = localStorage.getItem(listaTimeKey)
    return JSON.parse(listaTime) || []
}
function getStorageEditarTime() {
    const storageEditar = localStorage.getItem(editarKey)
    return JSON.parse(storageEditar)
}
/*---------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------------------------------- */


async function loadPokeList(pokeParam) {
    toggleSpinner()
    toggleBtnAdd()
    lastPage = pokeParam
    const response = await axios.get(pokeParam)
    getElementById(preencherListaId).innerHTML = ""
    for (let index = 0; index < response.data.results.length; index++) {
        const element = response.data.results[index];
        const storageAddTime = getStorageAddTime()
        const linkImg = await getSpritePokemon(element.name)
        if (storageAddTime.length < 6) {
            getElementById(preencherListaId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div> <img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6>' + element.name + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-change' onclick='listaMovimentos(\"" + linkImg + "\", \"" + element.name + "\")'>Moves</button><br>" +
                "<button class='btn btn-success rounded-0 btn-change btn-add' style='display: none;' onclick='btnAddTime(\"" + linkImg + "\", \"" + element.name + "\")'>Add ao Time</button>" +
                '</div>'
        } else {
            getElementById(preencherListaId).innerHTML +=
                '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
                '<div> <img src="' + linkImg + '" alt="' + element.name + '"></div>' +
                '<h6>' + element.name + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-change' onclick='listaMovimentos(\"" + linkImg + "\", \"" + element.name + "\")'>Moves</button>" +
                '</div>'
        }
    }
    toggleSpinner()
    toggleBtnAdd()
    previousPage = response.data.previous
    nextPage = response.data.next

}
preencherTime()
function preencherTime() {
    const storageAddTime = getStorageAddTime()
    getElementById(preencherTimeId).innerHTML = ""
    storageAddTime.forEach(element => {
        getElementById(preencherTimeId).innerHTML +=
            '<div class="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">' +
            '<div> <img src="' + element.imagemPokemon + '" alt="' + element.nomePokemon + '"></div>' +
            '<h6>' + element.nomePokemon + '</h6>' +
            "<button class='btn btn-primary rounded-0 btn-sm btn-change' onclick='listaMovimentos(\"" + element.imagemPokemon + "\", \"" + element.nomePokemon + "\")'>Moves</button><br>" +
            "<button class='btn btn-danger rounded-0 btn-change' onclick='btnDeletar(" + element.idPokemon + ")'>Delete</button>" +
            '</div>'

    });
}
function limparDados() {
    getElementById(preencherTimeId).innerHTML = ""
    localStorage.removeItem(timeAddKey)
    getElementById(nomeTimeId).value = ""
}

function timeEditarSelecionado() {
    let idTime = getStorageEditarTime()
    let timeSelecionado = getStorageListaTime()
    for (let index = 0; index < timeSelecionado.length; index++) {
        const element = timeSelecionado[index];
        console.log(element)
        if (element.idTime == idTime) {
            const timeSelecionadoArray = []

            if (element.primeiroPoke) {
                timeSelecionadoArray.push(element.primeiroPoke)
            }
            if (element.segundoPoke) {
                timeSelecionadoArray.push(element.segundoPoke)
            }
            if (element.terceiroPoke) {
                timeSelecionadoArray.push(element.terceiroPoke)
            }
            if (element.quartoPoke) {
                timeSelecionadoArray.push(element.quartoPoke)
            }
            if (element.quintoPoke) {
                timeSelecionadoArray.push(element.quintoPoke)
            }
            if (element.sextoPoke) {
                timeSelecionadoArray.push(element.sextoPoke)
            }
            timeSelecionadoArray.idTime = idTime
            console.log(timeSelecionadoArray)

            localStorage.setItem(timeAddKey, JSON.stringify(timeSelecionadoArray))
            getElementById(nomeTimeId).value = element.nomeTime
            preencherTime()
            toggleBtnCriarTime()
            loadPokeList(lastPage)
        }

    }
}
function verficarSeExisteTimeParaEditar() {
    let idTime = getStorageEditarTime()
    let timeSelecionado = getStorageListaTime()
    for (let index = 0; index < timeSelecionado.length; index++) {
        const element = timeSelecionado[index];
        if (element.idTime == idTime) {
            timeEditarSelecionado()
            return
        }
    }
    localStorage.removeItem(editarKey)
}

function generateId() {
    return new Date().getTime()
}
/*---------------------------------------------- Funções dos Botões --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function btnPreviousPage() {
    if (previousPage) {
        loadPokeList(previousPage)
    }
}

function btnNextPage() {
    if (nextPage) {
        loadPokeList(nextPage)
    }
}

function listaMovimentos(imgTemp, nomeTemp) {
    let pokeTarget = {
        imgTempPoke: imgTemp,
        nomeTempPoke: nomeTemp
    }
    localStorage.setItem(tempPokeTargetKey, JSON.stringify(pokeTarget))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%203/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-movimentos.html"
}

function btnAddTime(imgPoke, nomePoke) {

    let addTime = {
        imagemPokemon: imgPoke,
        nomePokemon: nomePoke,
        idPokemon: generateId()
    }
    const addTimeStorage = getStorageAddTime()
    addTimeStorage.push(addTime)
    localStorage.setItem(timeAddKey, JSON.stringify(addTimeStorage))
    loadPokeList(lastPage)
    preencherTime()
}
function btnDeletar(id) {
    let storageAddTime = getStorageAddTime()
    storageAddTime = storageAddTime.filter(function (element) {
        return element.idPokemon != id
    })
    localStorage.setItem(timeAddKey, JSON.stringify(storageAddTime))
    preencherTime()
    loadPokeList(lastPage)
}

getElementById(btnSalvarId).addEventListener('click', function (event) {
    event.preventDefault();
    const storageAddTime = getStorageAddTime()
    if (!getElementById(nomeTimeId).value) {
        return alert("escolha um nome para seu time!")
    } else {
        let timePoke = {
            nomeTime: getElementById(nomeTimeId).value,
            primeiroPoke: storageAddTime[0],
            segundoPoke: storageAddTime[1],
            terceiroPoke: storageAddTime[2],
            quartoPoke: storageAddTime[3],
            quintoPoke: storageAddTime[4],
            sextoPoke: storageAddTime[5]
        }
        const storageLista = getStorageListaTime()
        const idTimeStorage = localStorage.getItem(editarKey)
        if (idTimeStorage) {
            for (let index = 0; index < storageLista.length; index++) {
                const element = storageLista[index];
                if (element.idTime == idTimeStorage) {
                    timePoke.idTime = idTimeStorage
                    storageLista[index] = timePoke
                }

            }

        } else {
            timePoke.idTime = generateId()
            storageLista.push(timePoke)
        }
        localStorage.setItem(listaTimeKey, JSON.stringify(storageLista))
        limparDados()
        localStorage.removeItem(editarKey)
        toggleBtnSalvarTime()
        toggleBtnAdd()
    }
})

getElementById(btnExcluirId).addEventListener('click', function(event){
    event.preventDefault();
    const idTime = getStorageEditarTime()

    if(idTime){
        let timeAtual = getStorageListaTime()
        timeAtual = timeAtual.filter(function(element){
          return  element.idTime != idTime
        })
        localStorage.setItem(listaTimeKey, JSON.stringify(timeAtual))
        localStorage.removeItem(editarKey)
    }
    limparDados()
    toggleBtnAdd()
    toggleBtnExcluirTime()
    loadPokeList(lastPage)
})    

/*---------------------------------------------- Funções de Toggle --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function toggleSpinner() {
    var isSpinnerDisplayNone = getElementById(spinnerId).style.display == "none"
    if (isSpinnerDisplayNone) {
        getElementById(spinnerId).style.display = "inline-block"
        getElementById(preencherListaId).style.display = "none"
        document.querySelectorAll(".btn-change").forEach(element => {
            element.disabled = true
        });

    } else {
        getElementById(spinnerId).style.display = "none"
        getElementById(preencherListaId).style.display = "flex"
        document.querySelectorAll(".btn-change").forEach(element => {
            element.disabled = false
        });
    }
}
function toggleBtnCriarTime() {
    var isBtnCriarTimeBlock = getElementById(btnCriarTimeId).style.display == "inline-block"
    if (isBtnCriarTimeBlock) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divTimeAddId).style.display = "flex"
        getElementById(preencherTimeId).style.display = "flex"
        toggleBtnAdd()
    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divTimeAddId).style.display = "none"
        getElementById(preencherTimeId).style.display = "none"
    }
}

function toggleBtnSalvarTime() {
    var isBtnCriarTimeBlock = getElementById(btnSalvarId).style.display == "none"
    if (isBtnCriarTimeBlock) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divTimeAddId).style.display = "flex"
        getElementById(preencherTimeId).style.display = "flex"
        toggleBtnAdd()
    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divTimeAddId).style.display = "none"
        getElementById(preencherTimeId).style.display = "none"
    }
}

function toggleBtnExcluirTime() {
    var isBtnCriarTimeBlock = getElementById(btnExcluirId).style.display == "none"
    if (isBtnCriarTimeBlock) {
        getElementById(btnCriarTimeId).style.display = "none"
        getElementById(btnSalvarId).style.display = "inline-block"
        getElementById(btnExcluirId).style.display = "inline-block"
        getElementById(divTimeAddId).style.display = "flex"
        getElementById(preencherTimeId).style.display = "flex"
        toggleBtnAdd()
    } else {
        getElementById(btnCriarTimeId).style.display = "inline-block"
        getElementById(btnSalvarId).style.display = "none"
        getElementById(btnExcluirId).style.display = "none"
        getElementById(divTimeAddId).style.display = "none"
        getElementById(preencherTimeId).style.display = "none"
    }
}

function toggleBtnAdd() {
    var isBtnCriarTimeBlock = getElementById(btnCriarTimeId).style.display == "inline-block"
    if (isBtnCriarTimeBlock) {
        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "none"
        });
    } else {
        document.querySelectorAll(".btn-add").forEach(element => {
            element.style.display = "inline-block"
        });
    }
}