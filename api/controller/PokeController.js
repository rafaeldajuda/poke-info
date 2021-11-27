const Poke = require('../model/pokeModel');

class PokeController {
     static async insertPoke(pokeObject){
        return await Poke.create(pokeObject);
    }
    
    static async gettAllPoke(){
        return await Poke.find();
    }

    static async getPoke(pokedexNumber){
        return await Poke.findOne({pokedexNumber});
    }

    static async createPoke(pokemonObject){
        return await Poke.create(pokemonObject);
    }

    static async updatePoke(pokedexNumber, pokemonObject){
        return Poke.updateOne({ pokedexNumber }, pokemonObject);
    }

    static async deletePoke(pokedexNumber){
        return Poke.deleteOne({ pokedexNumber });
    }
}

module.exports = PokeController;