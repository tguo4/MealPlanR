// index.js is the entry point of the React app
// this is where the top-level <App> component is rendered from
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // holds application-wide styles
import App from './pages/App/App';
// <BrowserRouter> is the top-level React Router component that makes React Router work.
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Only a single <BrowserRouter> needs to be rendered 
    and any components that need to use routing features must be nested within it */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
