import React from 'react';
import ReactDOM from 'react-dom/client'; // This is the updated import for createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// This is the correct way to create a root in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
