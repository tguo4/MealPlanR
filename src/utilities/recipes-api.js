import sendRequest from "./send-request";

const BASE_URL = '/api/recipes/saved';

export function getAll() {
  return sendRequest(BASE_URL);
};

export function add(recipeData) {
  return sendRequest(BASE_URL, 'POST', recipeData);
}

export function getOne(title) {
  return sendRequest(`${BASE_URL}/${title}`);
};

export function deleteRecipe(title) {
  return sendRequest(`${BASE_URL}/${title}`, 'DELETE');
}

