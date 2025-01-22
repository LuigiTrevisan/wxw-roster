import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WrestlingRoster } from './components/WrestlingRoster'
import { WrestlerAdmin } from './components/WrestlerAdmin'

const baseURL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD;

function App() {
  console.log(baseURL);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WrestlingRoster />} />
      <Route path="/admin" element={<WrestlerAdmin />} />
      </Routes>
    </Router>
  )
}

export default App