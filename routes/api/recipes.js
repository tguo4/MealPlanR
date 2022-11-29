const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/api/recipes');

// GET /api/recipes/saved
router.get('/', recipesCtrl.getAll);

// GET /api/recipes/saved/:title
router.get('/:title', recipesCtrl.getOne);

// POST /api/recipes/saved
router.post('/', recipesCtrl.create);

// DELETE /api/recipes/saved/:title
router.delete('/:title', recipesCtrl.deleteRecipe);


module.exports = router;