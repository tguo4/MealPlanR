const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  day: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  source: { type: String, required: true },
  sourceURL: { type: String, required: true },
  calories: { type: Number, required: true },
  servings: { type: Number, required: true },
  ingredients: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);