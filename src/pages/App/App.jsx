import { useState, useEffect } from 'react';
import * as recipesAPI from '../../utilities/recipes-api';
// de-facto client-side routing library
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SearchRecipePage from '../SearchRecipePage/SearchRecipePage';
import RecipeDetailPage from '../RecipeDetailPage/RecipeDetailPage';
import SavedRecipePage from '../SavedRecipePage/SavedRecipePage';
import SavedRecipeDetailPage from '../SavedRecipeDetailPage/SavedRecipeDetailPage';
import MealPlannerPage from '../MealPlannerPage/MealPlannerPage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [savedRecipes, setSavedRecipes] = useState([]);
  // Local Storage only stores and retrieves strings. When saving, the data will automatically be converted to a string, 
  // however, must use JSON.parse() to convert the string retrieved from local storage back into a number, boolean, 
  // array, object, etc.
  const [detailedRecipe, setDetailedRecipe] = useState(JSON.parse(localStorage.getItem('detailedRecipe')) ?
    JSON.parse(localStorage.getItem('detailedRecipe'))
    :
    {}
  );
  const [savedDetailedRecipe, setSavedDetailedRecipe] = useState(JSON.parse(localStorage.getItem('savedDetailedRecipe')) ?
    JSON.parse(localStorage.getItem('savedDetailedRecipe'))
    :
    {}
  );
  // useEffect hook executes code after 
  useEffect(() => {
    localStorage.setItem('detailedRecipe', JSON.stringify(detailedRecipe));
  }, [detailedRecipe]);

  useEffect(() => {
    localStorage.setItem('savedDetailedRecipe', JSON.stringify(savedDetailedRecipe));
  }, [savedDetailedRecipe]);

  function handleSetRecipe(r) {
    // const recipeData = { r };
    // setDetailedRecipe(r);
    setDetailedRecipe((detailedRecipe) => ({ ...detailedRecipe, r }));
  }

  function handleSetSavedRecipe(r) {
    setSavedDetailedRecipe(r);
    // setSavedDetailedRecipe((savedDetailedRecipe) => ({ ...savedDetailedRecipe, r }));
  }

  async function handleSave(recipeData) {
    try {
      const recipe = await recipesAPI.add(recipeData);
      setSavedRecipes([...savedRecipes, recipe]);
    } catch {
      alert('Recipe has already been saved');
    }
  }

  function deleteRecipe(title) {
    window.confirm("Are you sure you want to delete this recipe");
    recipesAPI.deleteRecipe(title);
  }

  async function hasBeenSaved(title) {
    const isSaved = await recipesAPI.getOne(title);
    return isSaved;
  }

  return (
    <main className="App">
      {/* setup different sets of routes based on user state */}
      {user ?
        <>
          {/* React Router provides several components used to conditionally render our app's components 
          based upon the path of the URL in the address bar */}
          {/* Any component that needs to define client-side routes will first need to render a <Routes> component. */}
          <Routes>
            {/*  <Route> component is the main component used to conditionally 
            render a component instance (referred to as an "element" by React Router). */}
            <Route path='/recipes/search'
              element={
                <SearchRecipePage
                  user={user}
                  setUser={setUser}
                  handleSetRecipe={handleSetRecipe}
                />}
            />
            <Route path='/recipes/search/:title'
              element={
                <RecipeDetailPage
                  user={user}
                  setUser={setUser}
                  handleSave={handleSave}
                  detailedRecipe={detailedRecipe}
                  hasBeenSaved={hasBeenSaved}
                />}
            />
            <Route path='/planner'
              element={
                <MealPlannerPage
                  user={user}
                  setUser={setUser}
                />}
            />
            <Route path='/recipes/saved'
              element={
                <SavedRecipePage
                  user={user}
                  setUser={setUser}
                  savedRecipes={savedRecipes}
                  setSavedRecipes={setSavedRecipes}
                  handleSetSavedRecipe={handleSetSavedRecipe}
                />}
            />
            <Route path='/recipes/saved/:title'
              element={
                <SavedRecipeDetailPage
                  user={user}
                  setUser={setUser}
                  savedDetailedRecipe={savedDetailedRecipe}
                  deleteRecipe={deleteRecipe}
                />}
            />

            {/* redirect to /recipes/search if path in address bar hasn't matched a <Route> above */}
            <Route path='/*' element={<Navigate to="/recipes/search" />} />
          </Routes>
        </>
        :
        <>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginForm setUser={setUser} />} />
            <Route path='/signup' element={<SignUpForm setUser={setUser} />} />
            <Route path='/*' element={<Navigate to="/" />} />
          </Routes>
        </>

      }
    </main>
  );
}

