import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import LandingPage from './Components/landingPage.tsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);  // ¡Asegúrate de que este contenedor no sea null!

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/landigPage" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
