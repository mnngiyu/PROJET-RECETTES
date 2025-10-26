const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+$/, 'le nom doit etre valide'],
    },
    ingredients: [{
        type:mongoose.Schema.Types.ObjectId,
        ref : "ingredients",
    }],
    instructions: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["facile", "moyen", "difficile"],
        required: true,
    },
    // preparationTime: {
    //     type: Number,
    //     required: true,
    // },
    // cookingTime: {
    //     type: Number
    // },
    // category: {
    //     type: String,
    //     enum: ["entrée", "plat", "dessert"],
    //     required: true,
    // },
    // imageUrl: {
    //     type: String,
    //     default: null,
    // },
});


const recetteModel = mongoose.model('recettes', recetteSchema);

module.exports = recetteModel;