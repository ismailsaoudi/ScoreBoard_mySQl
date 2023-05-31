import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthForm from './Components/AuthForm';
import Home from './Components/Home/home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
