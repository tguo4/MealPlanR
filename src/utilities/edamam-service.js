export async function getRecipes(query) {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}
                  &app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&from=0&to=50`);
  const data = await response.json();
  return data.hits;
}