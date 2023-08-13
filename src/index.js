import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Actionhis } from './actionshis';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Actionhis />
  </React.StrictMode>
);
reportWebVitals();
