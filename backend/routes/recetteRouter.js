const recetteRouter = require('express').Router();
const recetteController = require('../controllers/recetteController');

recetteRouter.post("/recettes", recetteController.postRecette);
recetteRouter.get("/recettes", recetteController.getAll);
recetteRouter.get("/recettes/:id", recetteController.getOne);
recetteRouter.put("/recettes/:id", recetteController.update);
recetteRouter.delete("/recettes/:id", recetteController.delete);

module.exports = recetteRouter;

