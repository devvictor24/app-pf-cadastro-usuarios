import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEditando = usuarios.find((usuario) => usuario.id === parseInt(id));

  const [nome, setNome] = useState(usuarioEditando?.nome || '');
  const [email, setEmail] = useState(usuarioEditando?.email || '');
  const [telefone, setTelefone] = useState(usuarioEditando?.telefone || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    // Atualiza o usuário no localStorage
    const novosUsuarios = usuarios.map((usuario) =>
      usuario.id === parseInt(id)
        ? { ...usuario, nome, email, telefone }
        : usuario
    );
    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));

    // Redireciona de volta para a tela "Ver Dados"
    navigate('/ver-dados');
  };

  return (
    <div className="editar-usuario-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarUsuario;