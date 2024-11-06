// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './Index.css';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App inside BrowserRouter
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />  {/* App component contains the route logic */}
  </BrowserRouter>
);
