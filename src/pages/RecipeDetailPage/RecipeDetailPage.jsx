import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import './RecipeDetailPage.css';
import edamam from '../../img/edamam-logo.svg';

export default function RecipeDetailPage({ user, setUser, detailedRecipe, handleSave, hasBeenSaved }) {
  const [saved, setSaved] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);

  function toggleForm() {
    setShowMealForm(!showMealForm);
  }

  useEffect(function() {
    async function checkIfSaved() {
      const result = await hasBeenSaved(recipeData.title);
      setSaved(result);
    }
    checkIfSaved();
  });

  const recipeData = {
    title: detailedRecipe.r.recipe.label,
    image: detailedRecipe.r.recipe.image,
    source: detailedRecipe.r.recipe.source,
    sourceURL: detailedRecipe.r.recipe.url,
    calories: (detailedRecipe.r.recipe.calories / detailedRecipe.r.recipe.yield).toFixed(),
    servings: detailedRecipe.r.recipe.yield,
    ingredients: detailedRecipe.r.recipe.ingredientLines,
  };

  const ingredientsList = recipeData.ingredients.map((ing, i) => <li key={i}>{ing}</li>);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <main className="RecipeDetailPage">
        <div className="title">{recipeData.title}</div>
        <div className="source">See full recipe on: <a href={recipeData.sourceURL} target="_blank" rel="noreferrer">{recipeData.source}</a></div>
        <div className="stats">
          <div>
            <div className="bold">{recipeData.ingredients.length}</div>
            <div>Ingredients</div>
          </div>
          <div className="servings">
            <div className="bold">{recipeData.servings}</div>
            <div>Servings</div>
          </div>
          <div>
            <div className="bold">{recipeData.calories}</div>
            <div>Calories/serving</div>
          </div>
        </div>
        <img src={recipeData.image} alt="" className="image" />
        <div className="save">
          {saved ?
            <p className="message">Recipe has been saved</p>
            :
            <button className="btn green" onClick={() => handleSave(recipeData)}>+ Save</button>
          }

          <button className="btn">Add to Meal Plan</button>
          <button onClick={toggleForm} className="btn">Add to Meal Plan</button>
          {showMealForm &&
            <form className="meal-form">
              <label for="day">Chose a Day:</label>
              <select name="day" id="day">
                <option value="volvo">Monday</option>
                <option value="saab">Tuesday</option>
                <option value="opel">Wednesday</option>
                <option value="audi">Thursday</option>
                <option value="audi">Thursday</option>
                <option value="audi">Friday</option>
                <option value="audi">Saturday</option>
                <option value="audi">Sunday</option>
              </select>
              <label for="type">Chose Meal Type:</label>
              <select name="type" id="type">
                <option value="volvo">Breakfast</option>
                <option value="saab">Lunch</option>
                <option value="opel">Dinner</option>
              </select>
              <button type="submit">ADD</button>
            </form>

          }

        </div>
        <div className="row-border"></div>
        <div className="ingredients">
          <h3>{recipeData.ingredients.length} Ingredients</h3>
          <ul className="list">
            {ingredientsList}
          </ul>
        </div>
        <div className="directions">
          <button className="directions-btn">
            <a className="link" href={recipeData.sourceURL} target="_blank" rel="noreferrer"> Directions</a>
          </button>
          <span>at {recipeData.source}</span>
        </div>
        <img src={edamam} alt="" className="edamam" />
      </main >
    </div >
  );
}