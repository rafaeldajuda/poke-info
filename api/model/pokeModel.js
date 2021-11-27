const mongoose = require('../database');

const PokeSchema = new mongoose.Schema({
    pokedexNumber: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        maxlength: 4
    },
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        maxLength: 50
    },
    type1: {
        type: String,
        required: true,
        maxlength: 20
    },
    type2: {
        type: String,
        required: false,
        maxLength: 20
    },
    linkImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Poke = mongoose.model('Poke', PokeSchema);

module.exports = Poke;