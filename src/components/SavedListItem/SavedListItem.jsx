import { Link } from 'react-router-dom';
import './SavedListItem.css';

export default function SavedListItem({ r, handleSetSavedRecipe }) {
  const { title, image, source, calories, ingredients } = r;

  return (
    <Link to={`/recipes/saved/${title}`} style={{ textDecoration: 'none', color: 'black' }}
      onClick={() => handleSetSavedRecipe(r)}>
      <div className="SavedListItem">
        <img src={image} alt="" />
        <div className="container">
          <div className='title'>{title}</div>
          <div className='divider'>
            {calories} Calories <span>{ingredients.length} Ingredients</span>
          </div>
          <div className='source'>{source}</div>
        </div>
      </div >
    </Link >
  );
}