import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import RecipeList from "../../components/RecipeList/RecipeList";
import SearchForm from "../../components/SearchForm/SearchForm";
import * as edamamService from '../../utilities/edamam-service';


export default function SearchRecipePage({ user, setUser, detailedRecipe, setDetailedRecipe, handleSetRecipe }) {
  const [search, setSearch] = useState(localStorage.getItem('search') ? localStorage.getItem('search') : '');
  const [query, setQuery] = useState(localStorage.getItem('query') ? localStorage.getItem('query') : '');
  const [recipes, setRecipes] = useState([]);

  useEffect(function() {
    async function getRecipes() {
      const recipes = await edamamService.getRecipes(query);
      setRecipes(recipes);
    }
    getRecipes();
  }, [query]);

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <SearchForm
        search={search}
        setSearch={setSearch}
        setQuery={setQuery}
      />
      <RecipeList
        recipes={recipes}
        detailedRecipe={detailedRecipe}
        setDetailedRecipe={setDetailedRecipe}
        handleSetRecipe={handleSetRecipe}
      />
    </div>
  );
}