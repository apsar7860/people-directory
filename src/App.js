import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PeopleDirectory from './components/PeopleDirectory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/people" element={<PeopleDirectory />} />
      </Routes>
    </Router>
  );
};

export default App;
