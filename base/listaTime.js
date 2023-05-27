var listaTimeKey = 'listaTime'
var editarKey = "editarTime"
var preencherListaId = "preencherListaDeTimes"
var tempPokeTargetKey = "tempPoke"

function getElementById(id) {
    return document.getElementById(id)
}

function getStorageListaTime() {
    const listaTime = localStorage.getItem(listaTimeKey)
    return JSON.parse(listaTime) || []
}

/*---------------------------------------------- Funções de Exibição --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
preencherListaTime()
function preencherListaTime() {
    getElementById(preencherListaId).innerHTML = ""
    getStorageListaTime().forEach(function(element, index) {
        if(element.primeiroPoke == undefined){
            element.primeiroPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }

        }
        if(element.segundoPoke == undefined){
            element.segundoPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }
            
        }
        if(element.terceiroPoke == undefined){
            element.terceiroPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }
            
        }
        if(element.quartoPoke == undefined){
            element.quartoPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }
            
        }
        if(element.quintoPoke == undefined){
            element.quintoPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }
            
        }
        if(element.sextoPoke == undefined){
            element.sextoPoke = {
                imagemPokemon: "",
                nomePokemon: ""
            }
           
        }

        getElementById(preencherListaId).innerHTML +=
            '<tr>' +
            '<th scope="row">'+element.idTime+'</th>' +
            '<td>'+element.nomeTime+'</td>' +
            '<td>' +
            '<div> <img src="' +element.primeiroPoke.imagemPokemon + '" alt="' + element.primeiroPoke.nomePokemon + '"></div>' +
                '<h6>' + element.primeiroPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-primeiro' style='display: inline-block;' onclick='listaMovimentos(\"" + element.primeiroPoke.imagemPokemon + "\", \"" + element.primeiroPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<div> <img src="' +element.segundoPoke.imagemPokemon + '" alt="' + element.segundoPoke.nomePokemon + '"></div>' +
                '<h6>' + element.segundoPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-segundo' style='display: inline-block;' onclick='listaMovimentos(\"" + element.segundoPoke.imagemPokemon + "\", \"" + element.segundoPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<div> <img src="' +element.terceiroPoke.imagemPokemon + '" alt="' + element.terceiroPoke.nomePokemon + '"></div>' +
                '<h6>' + element.terceiroPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-terceiro' style='display: inline-block;' onclick='listaMovimentos(\"" + element.terceiroPoke.imagemPokemon + "\", \"" + element.terceiroPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<div> <img src="' +element.quartoPoke.imagemPokemon + '" alt="' + element.quartoPoke.nomePokemon + '"></div>' +
                '<h6>' + element.quartoPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-quarto' style='display: inline-block;' onclick='listaMovimentos(\"" + element.quartoPoke.imagemPokemon + "\", \"" + element.quartoPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<div> <img src="' +element.quintoPoke.imagemPokemon + '" alt="' + element.quintoPoke.nomePokemon + '"></div>' +
                '<h6>' + element.quintoPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-quinto' style='display: inline-block;' onclick='listaMovimentos(\"" + element.quintoPoke.imagemPokemon + "\", \"" + element.quintoPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<div> <img src="' +element.sextoPoke.imagemPokemon + '" alt="' + element.sextoPoke.nomePokemon + '"></div>' +
                '<h6>' + element.sextoPoke.nomePokemon + '</h6>' +
                "<button class='btn btn-primary rounded-0 btn-sm btn-sexto' style='display: inline-block;' onclick='listaMovimentos(\"" + element.sextoPoke.imagemPokemon + "\", \"" + element.sextoPoke.nomePokemon + "\")'>Moves</button>" +
            '</td>' +
            '<td>' +
            '<button class="btn btn-warning rounded-0" onclick="btnEditar('+element.idTime+')">Editar</button><br>' +
            '<button class="btn btn-danger rounded-0" onclick="btnExcluir('+element.idTime+')">Excluir</button>' +
            '</td>' +
            '</tr>'

            if(!element.primeiroPoke.idPokemon){
 
                document.querySelectorAll(".btn-primeiro")[index].style.display = "none"
            }
            if(!element.segundoPoke.idPokemon){

                document.querySelectorAll(".btn-segundo")[index].style.display = "none"
            }
            if(!element.terceiroPoke.idPokemon){

                document.querySelectorAll(".btn-terceiro")[index].style.display = "none"    
            }
            if(!element.quartoPoke.idPokemon){
                
                document.querySelectorAll(".btn-quarto")[index].style.display = "none"
            }
            if(!element.quintoPoke.idPokemon){
               
                document.querySelectorAll(".btn-quinto")[index].style.display = "none"
            }
            if(!element.sextoPoke.idPokemon){
                document.querySelectorAll(".btn-sexto")[index].style.display = "none"
            }

    });
}

/*---------------------------------------------- Funções de Botões --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function listaMovimentos(imgTemp, nomeTemp) {
    let pokeTarget = {
        imgTempPoke: imgTemp,
        nomeTempPoke: nomeTemp
    }
    localStorage.setItem(tempPokeTargetKey, JSON.stringify(pokeTarget))
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%203/coreui-free-bootstrap-admin-template-main/dist/base/lista-de-movimentos.html"
}

function btnExcluir(id){
   let storageLista = getStorageListaTime()
   storageLista = storageLista.filter(function(element){
    return element.idTime != id
   })
   localStorage.setItem(listaTimeKey, JSON.stringify(storageLista))
   preencherListaTime()
   
}

function btnEditar(id){
    localStorage.setItem(editarKey, id)
    window.location.href = "file:///home/marcos/Desktop/ESTUDOS/projeto%20pokemon%203/coreui-free-bootstrap-admin-template-main/dist/lista-geral-pokemons.html"
}