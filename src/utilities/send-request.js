import { getToken } from './users-service';
//  The sendRequest function always returns a promise 
export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an 'options' object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    options.body = JSON.stringify(payload);
  }
  // if there's a valid token in local storage, include it with the AJAX request in a header:
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  // the fetch function returns a promise that quickly resolves to a response object 
  // with properties pertaining to the results of the request
  const res = await fetch(url, options);
  // Check if request was successful
  if (res.ok) return res.json(); // the json() method also returns a promise which resolves to the actual data (the JWT)
  throw new Error('Bad Request');
}