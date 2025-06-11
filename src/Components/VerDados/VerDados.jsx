import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VerDados.css';

const VerDados = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado) {
    return <div>Você precisa estar logado para ver seus dados.</div>;
  }

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosSalvos);
  }, []);

  // Função para excluir um usuário
  const handleExcluirUsuario = (id) => {
    const novosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    setUsuarios(novosUsuarios);
  };

  return (
    <div className="ver-dados-container">
      <h1>Meus Dados</h1>

      {/* Dados do usuário logado */}
      <div className="dados-card">
        <p><strong>Nome:</strong> {usuarioLogado.nome}</p>
        <p><strong>Email:</strong> {usuarioLogado.email}</p>
        <p><strong>Telefone:</strong> {usuarioLogado.telefone}</p>
      </div>

      {/* Botão para adicionar novo usuário */}
      <Link to="/adicionar-usuario" className="btn-adicionar">Adicionar Usuário</Link>

      {/* Tabela de usuários cadastrados */}
      <h2>Usuários Cadastrados</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>
                    {/* Botão Editar */}
                    <Link to={`/editar-usuario/${usuario.id}`} className="btn-editar">
                      Editar
                    </Link>
                    {/* Botão Excluir */}
                    <button onClick={() => handleExcluirUsuario(usuario.id)} className="btn-excluir">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Nenhum usuário cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botão para voltar */}
      <Link to="/home" className="btn-voltar">Voltar</Link>
    </div>
  );
};

export default VerDados;