import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WrestlingRoster } from './components/WrestlingRoster'
import { WrestlerAdmin } from './components/WrestlerAdmin'

function App() {
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