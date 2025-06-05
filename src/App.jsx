import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'; 
import Cadastro from './Components/Cadastro/Cadastro';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default App;