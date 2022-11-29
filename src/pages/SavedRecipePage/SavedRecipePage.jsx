import { useEffect } from 'react';
import * as recipesAPI from '../../utilities/recipes-api';
import NavBar from "../../components/NavBar/NavBar";
import SavedList from "../../components/SavedList/SavedList";
import edamam from '../../img/edamam-logo.svg';


export default function SavedRecipePage({ user, setUser, savedRecipes, setSavedRecipes, handleSetSavedRecipe }) {

  useEffect(function() {
    async function getRecipes() {
      const recipes = await recipesAPI.getAll();
      setSavedRecipes(recipes);
    }
    getRecipes();
  }, [setSavedRecipes]);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <h1>Saved Recipes</h1>
      <SavedList
        savedRecipes={savedRecipes}
        handleSetSavedRecipe={handleSetSavedRecipe}
      />
      <img src={edamam} alt="" className='edamam' />
    </div>
  );
}