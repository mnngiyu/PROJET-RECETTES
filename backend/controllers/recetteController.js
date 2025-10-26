const recetteModel = require('../models/recetteModel');
const ingredientModel = require('../models/ingredientModel');

exports.postRecette = async (req, res) => {
    try {
      const { title, instructions, difficulty, ingredients } = req.body;
  
      // Vérifie que la structure est conforme
      if (!title || !instructions || !difficulty || !Array.isArray(ingredients)) {
        return res.status(400).json({ message: "Champs manquants ou invalides." });
      }
  
      // Étape 1 – Créer les ingrédients et récupérer leurs _id
      const createdIngredients = await Promise.all(
        ingredients.map(async (ing) => {
          const newIngredient = new ingredientModel({
            name: ing.name,
            qty: ing.qty
          });
          await newIngredient.save();
          return newIngredient._id;
        })
      );
  
      // Étape 2 – Créer la recette avec les ID des ingrédients
      const newRecette = new recetteModel({
        title,
        instructions,
        difficulty,
        ingredients: createdIngredients
      });
  
      await newRecette.save();
  
      // Étape 3 – Mettre à jour les ingrédients avec la recette associée
      await Promise.all(
        createdIngredients.map(async (id) => {
          await ingredientModel.findByIdAndUpdate(id, { recette: newRecette._id });
        })
      );
  
      res.json({ message: "Recette ajoutée avec succès", data: newRecette });
  
    } catch (error) {
      console.error('❌ Erreur lors de la création de la recette :', error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };


exports.getAll = async (req, res) => {
    try {
        const recettes = await recetteModel.find().populate("ingredients")
        res.json(recettes)
    } catch (error) {
        res.json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const recette = await recetteModel.findById(req.params.id)
        res.json({ message: "recette récupérés avec succès", data: recette })
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.update = async (req, res) => {
    try {
        const recette = await recettetModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        res.json({ message: "recette modifié avec succès", data: recette })
    } catch (error) {
        res.json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const recettes = await recetteModel.findByIdAndDelete(req.params.id)
        await ingredientModel.deleteMany({ recette: recettes._id })
        res.json({ message: "recette supprimés avec succès", data: recette })
    } catch (error) {
        res.json(error)
    }
}