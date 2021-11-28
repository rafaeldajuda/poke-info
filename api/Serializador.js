class Serializador {
    json(dados){
        return JSON.stringify(dados);
    }

    xml(dados) {
        let textXML = '';
        if(Array.isArray(dados)){
            textXML += '<' + this.tagPlural + '>';
            for(let indice in dados) {
                
                textXML+= '<' + this.tagSingular + '>';
                let poke = dados[indice];

                textXML += '<' + '_id' + '>' + poke._id + '</' +  '_id' + '>'
                textXML += '<' + 'pokedexNumber' + '>' + poke.pokedexNumber + '</' +  'pokedexNumber' + '>'
                textXML += '<' + 'name' + '>' + poke.name + '</' +  'name' + '>'
                textXML += '<' + 'type1' + '>' + poke.type1 + '</' +  'type1' + '>'
                textXML += '<' + 'type2' + '>' + poke.type2 + '</' +  'type2' + '>'
                textXML += '<' + 'linkImage' + '>' + poke.linkImage + '</' +  'linkImage' + '>'
                textXML += '<' + 'createdAt' + '>' + poke.createdAt + '</' +  'createdAt' + '>'
                textXML += '<' + 'updatedAt' + '>' + poke.updatedAt + '</' +  'updatedAt' + '>'

                textXML+= '</' + this.tagSingular + '>';
            }

            textXML += '</' + this.tagPlural + '>';
        }else{
            textXML+= '<' + this.tagSingular + '>';
                let poke = dados;

                textXML += '<' + '_id' + '>' + poke._id + '</' +  '_id' + '>'
                textXML += '<' + 'pokedexNumber' + '>' + poke.pokedexNumber + '</' +  'pokedexNumber' + '>'
                textXML += '<' + 'name' + '>' + poke.name + '</' +  'name' + '>'
                textXML += '<' + 'type1' + '>' + poke.type1 + '</' +  'type1' + '>'
                textXML += '<' + 'type2' + '>' + poke.type2 + '</' +  'type2' + '>'
                textXML += '<' + 'linkImage' + '>' + poke.linkImage + '</' +  'linkImage' + '>'
                textXML += '<' + 'createdAt' + '>' + poke.createdAt + '</' +  'createdAt' + '>'
                textXML += '<' + 'updatedAt' + '>' + poke.updatedAt + '</' +  'updatedAt' + '>'

                textXML+= '</' + this.tagSingular + '>';
        }

        return textXML;
    }

    serializador(dados) {
        if(this.contentType === 'application/json'){
            return this.json(dados);
        }

        if(this.contentType === "application/xml" || this.contentType === "text/xml"){
            return this.xml(dados);
        }
    }
}

class SerializadorPoke extends Serializador{
    constructor(contentType){
        super();
        this.contentType = contentType;
        this.tagSingular = 'pokemon';
        this.tagPlural = 'pokemons'
    }
}

module.exports = {
    SerializadorPoke: SerializadorPoke
}