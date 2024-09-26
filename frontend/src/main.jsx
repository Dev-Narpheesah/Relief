// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global CSS, if any
import App from './App'; // Import your App component
import { AuthProvider } from '../Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider here */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
