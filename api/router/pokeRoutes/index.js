const Router = require('express').Router;
const PokeController = require('../../controller/PokeController');

const router = Router();

router.get('/pokemons', async (req, res) => {
    try{
        const listPokemons = await PokeController.gettAllPoke();
        return res.status(200).json(listPokemons);
    }catch(err){
        return res.status(500).json(err);
    }
});

router.get('/pokemons/:pokedexNumber', async (req, res) => {
    const pokedexNumber  = req.params.pokedexNumber;

    try{
        const pokemon = await PokeController.getPoke(pokedexNumber);

        if(!pokemon){
             return res.status(404).end();
        }

        return res.status(200).json(pokemon);
    }catch(err) {
        return res.status(500).json(err);
    }
});

router.post('/pokemons', async (req, res) => {
    const pokeObject = req.body;
    const pokedexNumber = pokeObject.pokedexNumber;

    try{
        const pokemon = await PokeController.getPoke(pokedexNumber);

        if(!pokemon){
            const newPokemon = await PokeController.createPoke(pokeObject);
            
            if(!newPokemon){
                return res.status(400).json({ msg: 'error create pokemon' });
            }

            return res.status(201).json(newPokemon);
        }

        return res.status(400).json({ msg: 'pokemon already exists' });
    }catch(err){
        return res.status(500).json(err);
    }
});

router.put('/pokemons/:pokedexNumber', async (req, res) => {
    const pokeObject = req.body;
    const pokedexNumber = req.params.pokedexNumber;

    //UPDATE DATE
    pokeObject.updatedAt = new Date();

    try{
        const pokemon = await PokeController.getPoke(pokedexNumber);

        if(!pokemon){
            return res.status(404).end();
        }

        const updatePokemon = await PokeController.updatePoke(pokedexNumber, pokeObject);
        if(!updatePokemon){
            return res.status(400).end({ msg: 'error update pokemon' });
        }

        const infoPoke = await PokeController.getPoke(pokedexNumber);
        return res.status(200).json(infoPoke);

    }catch(err){
        return res.status(500).json(err);
    }

});

router.delete('/pokemons/:pokedexNumber', async (req, res) => {
    const pokedexNumber = req.params.pokedexNumber;

    try{
        const pokemon = await PokeController.getPoke(pokedexNumber);
        if(!pokemon){
            return res.status(404).end();
        }

        //const deletedPokemon = await PokeController.deletePoke(pokedexNumber);
        return res.status(200).end();
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports = router;