import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
import Home from './Components/Home/home';
import './App.css';
import SearchRecord from './Components/searchRecord';
import PopupModal from "./PopupModal";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/searchRecord" element={<SearchRecord />} />
        </Routes>
      </Router>
      <PopupModal isOpen={true} />
    </div>
  );
};

export default App;
