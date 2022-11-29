import RecipeListItem from "../RecipeListItem/RecipeListItem";
import './RecipeList.css';

export default function RecipeList({ recipes, setDetailedRecipe, handleSetRecipe }) {
  const recipeList = recipes.map((r, i) => {
    return (
      <RecipeListItem
        key={i}
        r={r}
        handleSetRecipe={handleSetRecipe}
        setDetailedRecipe={setDetailedRecipe}
      />
    );
  }
  );
  return (
    <div className="RecipeList">
      {recipeList}
    </div>
  );
}