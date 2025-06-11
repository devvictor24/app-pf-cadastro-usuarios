import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'; 
import Cadastro from './Components/Cadastro/Cadastro';
import Usuario from './Components/Tela_usuario/usuario';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerDados from './Components/VerDados/VerDados';
import AdicionarUsuario from './Components/AdicionarUsuario/AdicionarUsuario';
import EditarUsuario from './Components/VerDados/EditarUsuario';



import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Usuario />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/ver-dados" element={<VerDados />} />
        <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
      </Routes>
    </div>
  );
}

export default App;