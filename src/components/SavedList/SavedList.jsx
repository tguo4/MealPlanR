import SavedListItem from '../SavedListItem/SavedListItem';
import './SavedList.css';

export default function SavedList({ savedRecipes, handleSetSavedRecipe }) {
  const savedList = savedRecipes.map((r) =>
    <SavedListItem
      key={r._id}
      r={r}
      handleSetSavedRecipe={handleSetSavedRecipe}
    />
  );

  return (
    <div className="SavedList">
      {savedList}
    </div>
  );
}