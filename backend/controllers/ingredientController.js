const ingredientModel = require('../models/ingredientModel');

exports.postIngredient = async (req, res) => {
    try {
        const newIngredient = new ingredientModel(req.body)
        await newIngredient.save()
        res.json({ message: "ingredient bien créé", data: newIngredient })
    } catch (error) {
        res.json(error)
    }
}

exports.getAll = async (req, res) => {
    try {
        const ingredients = await ingredientModel.find()
        res.json({ message: "ingredients récupérés avec succès", data: ingredients })
    } catch (error) {
        res.json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const ingredients = await ingredientModel.findById(req.params.id)
        res.json({ message: "ingredient récupérés avec succès", data: ingredients })
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.update = async (req, res) => {
    try {
        const ingredients = await ingredientModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        res.json({ message: "ingredients modifiés avec succès", data: ingredients })
    } catch (error) {
        res.json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const ingredients = await ingredientModel.findByIdAndDelete(req.params.id)
        res.json({ message: "ingredients supprimés avec succès", data: ingredients })
    } catch (error) {
        res.json(error)
    }
}