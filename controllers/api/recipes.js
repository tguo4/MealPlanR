const Recipe = require('../../models/recipe');

module.exports = {
  getAll,
  getOne,
  create,
  deleteRecipe
};

async function getAll(req, res) {
  const recipes = await Recipe.find({ user: req.user._id });
  res.json(recipes);
};

async function getOne(req, res) {
  const recipe = await Recipe.findOne({
    user: req.user._id,
    title: req.params.title
  }).exec();
  if (recipe) res.json(true);
  else res.json(false);
}

async function create(req, res) {
  try {
    const recipeExists = await Recipe.findOne({ user: req.user._id, title: req.body.title }).exec();
    if (recipeExists) throw new Error();
    req.body.user = req.user._id;
    const recipe = await Recipe.create(req.body);
    res.json(recipe);
  } catch {
    res.status(400).json('Recipe has already been saved');
  }
}

function deleteRecipe(req, res) {
  Recipe.deleteOne({ user: req.user._id, title: req.params.title }, function(err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
}