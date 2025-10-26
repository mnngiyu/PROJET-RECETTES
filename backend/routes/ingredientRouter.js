
const ingredientRouter = require('express').Router();
const ingredientController = require('../controllers/ingredientController');

ingredientRouter.post("/ingredients", ingredientController.postIngredient);
ingredientRouter.get("/ingredients", ingredientController.getAll);
ingredientRouter.get("/ingredients/:id", ingredientController.getOne);
ingredientRouter.put("/ingredients/:id", ingredientController.update);
ingredientRouter.delete("/ingredients/:id", ingredientController.delete);

module.exports = ingredientRouter; 