const mongoose = require('../database');
const http = require('../others/http');
const config = require('config');
const PokeController = require('../controller/PokeController');

function listPokemons(linkSite){
    let option = {
        method: 'GET',
        url: linkSite,
        timeout: 30,
        Headers: {
        },
        body: null
    }

    let resposta = http(option);
    let pokeHTML = resposta.body.replace(/\n/g, '');
    let openTable = '<table class="wikitable"';
    let closeTable = '</table>';
    let listPokeObjects = [];

    while(true){

        // GET TABLE
        let indexOpenTable = pokeHTML.indexOf(openTable);
    
        // indexOpenTable EXISTS?
        if(indexOpenTable === -1){
            break;
        }

        // ALTER START AND END TABLE
        pokeHTML = pokeHTML.substring(indexOpenTable);
        indexOpenTable = pokeHTML.indexOf(openTable);
        let indexCloseTable = pokeHTML.indexOf(closeTable);

        // GET TBODY
        let pokeTable = getPokeTable(pokeHTML, indexOpenTable);

        // GET ROWS
        let pokeRows = getPokeRows(pokeTable);

        // GET POKE OBJECT
        for(let element of pokeRows){
            let pokeObject = getPokeObject(element);
            if(pokeObject != null){
                listPokeObjects.push(pokeObject);
            }
        }

        // ALTER START TABLE
        pokeHTML = pokeHTML.substring(indexCloseTable + 8);

    }

    return listPokeObjects;
    
}


function getPokeTable(pokeHTML, indexOpenTable){
    let newPokeHTML = pokeHTML.substring(indexOpenTable);
    let indexOpenTB = newPokeHTML.indexOf('<tbody>');
    let indexCloseTB = newPokeHTML.indexOf('</tbody>') + 8;
    let pokeTable = newPokeHTML.substring(indexOpenTB, indexCloseTB);

    return pokeTable;
}

function getPokeRows(pokeTable) {
    let pokeRows = [];
    
    while(true){
        let indexOpenRow = pokeTable.indexOf('<tr>');
        if(indexOpenRow !== -1){
            let indexCloseRow = pokeTable.indexOf('</tr>') + 5;
            let pokeRow = pokeTable.substring(indexOpenRow, indexCloseRow); 
            pokeRows.push(pokeRow);

            // ALTER START TABLE
            pokeTable = pokeTable.substring(indexCloseRow);
        }else{
            break;
        }
    }
    
    return pokeRows;
}

function getPokeObject(pokeRow){
    
    if(pokeRow.indexOf('<th>#') === -1){
        let pokeObject = {};

        // GET pokedexNumber
        let openTd = pokeRow.indexOf('<td>') + 4;
        let closeTd = pokeRow.indexOf('</td>');
        pokeObject.pokedexNumber = pokeRow.substring(openTd, closeTd);
        pokeRow = pokeRow.substring(closeTd + 5) ;

        // GET linkImage
        openTd = pokeRow.indexOf('<td>') + 4;
        closeTd = pokeRow.indexOf('</td>');
        let img =  pokeRow.substring(openTd, closeTd);
        let openImage = img.indexOf('href="') + 6;
        let closeImage = img.indexOf('" ');
        pokeObject.linkImage = img.substring(openImage, closeImage) + '.' + pokeObject.pokedexNumber + '.png';
        pokeRow = pokeRow.substring(closeTd + 5);

        // GET name
        openTd = pokeRow.indexOf('<td>') + 4;
        closeTd = pokeRow.indexOf('</td>');
        let title = pokeRow.substring(openTd, closeTd);
        let openTitle = title.indexOf('title="') + 7;
        let closeTitle = title.indexOf('">');
        pokeObject.name = title.substring(openTitle, closeTitle);
        pokeRow = pokeRow.substring(closeTd + 5);

        // GET type1
        openTd = pokeRow.indexOf('<td>') + 4;
        closeTd = pokeRow.indexOf('</td>');
        let type1 = pokeRow.substring(openTd, closeTd);
        let openType1 = type1.indexOf('title="') + 7;
        let closeType1 = type1.indexOf(' type">');
        pokeObject.type1 = type1.substring(openType1, closeType1);
        pokeRow = pokeRow.substring(closeTd + 5);

        // GET type1
        openTd = pokeRow.indexOf('<td>') + 4;
        closeTd = pokeRow.indexOf('</td>');
        let type2 = pokeRow.substring(openTd, closeTd);
        let openType2 = type2.indexOf('title="') + 7;
        let closeType2 = type2.indexOf(' type">');
        pokeObject.type2 = type2.substring(openType2, closeType2);
        pokeRow = pokeRow.substring(closeTd + 5);

        return pokeObject;
    }

    return null;
}

// INSERT POKE OBJECTS
const insertPokes = async (listPokeObjects) => {
    for(let element of listPokeObjects) {
        if(! await PokeController.getPoke(element.pokedexNumber)){
            const poke = await PokeController.insertPoke(element);
            console.log(poke);
        }else{
            console.log(element.pokedexNumber + " already exists");
        }
    }

    mongoose.connection.close();
}

const linkSite = config.get('api.linkSite');
const listPokeObjects = listPokemons(linkSite);
insertPokes(listPokeObjects);

