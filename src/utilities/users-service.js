/*  This module organizes functions used to sign-up, log in, log out, etc. */
// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from './users-api';

// no try/catch block because any error will propagate up to the "consumer" of the service - 
// in this case the consumer is the handleSubmit method in the <SignUpForm> component.

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js
  // module which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds
  if (payload.exp < Date.now() / 1000) {
    // token has expired - remove it from localStorage
    localStorage.removeitem('token');
    return null;
  }
  return token;
}

// Function used to set user state
export function getUser() {
  const token = getToken();
  // If there's a token, return the user (data from user MongoDB doc) in the payload, else return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('query');
  localStorage.removeItem('search');
  localStorage.removeItem('detailedRecipe');
  localStorage.removeItem('savedDetailedRecipe');
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

// utility to check if token has expired
// export async function checkToken() {
//   // Just so that you don't forget how to use .then
//   return usersAPI.checkToken()
//     // checkToken returns a string, but let's 
//     // make it a Date object for more flexibility
//     .then(dateStr => new Date(dateStr));
//   // If you want to use async/await
//   // return new Date(await usersAPI.checkToken());
// }; 