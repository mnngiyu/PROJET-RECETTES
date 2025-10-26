const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match : [/^[a-zA-Z0-9\s]+$/, "l'ingredient doit etre valide"]
    },
    qty: {
        type: Number,
        required: true,
        min: 0,
    },
    recette: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recettes',
    },
});

const ingredientModel = mongoose.model('ingredients', ingredientSchema);
module.exports = ingredientModel;