import { Link } from 'react-router-dom';
import './RecipeListItem.css';

export default function RecipeListItem({ r, handleSetRecipe }) {

  return (
    <Link to={`/recipes/search/${r.recipe.label}`} onClick={() => handleSetRecipe(r)}
      style={{ textDecoration: 'none', color: 'black' }}>
      <div className="RecipeListItem">
        <img src={r.recipe.image} alt="" />
        <div className="container">
          <div className='title'>{r.recipe.label}</div>
          <div className='divider'>
            {(r.recipe.calories / r.recipe.yield).toFixed()} Calories <span>{r.recipe.ingredientLines.length} Ingredients</span>
          </div>
          <div className='source'>{r.recipe.source}</div>
        </div>
      </div >
    </Link >
  );
};