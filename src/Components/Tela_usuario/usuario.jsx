import React from 'react';
import './usuario.css'; // Importa o CSS associado
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate para redirecionamento

function TelaPosLogin() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleLogout = () => {
    // 1. Remover o token de autenticação (ou qualquer dado de sessão)
    // Isso é crucial para "deslogar" o usuário
    localStorage.removeItem('token'); // Se você salvou um token
    // Se você usa outro método (ex: sessionStorage, context API, Redux), remova-o de lá

    // 2. Redirecionar o usuário para a tela de login (ou página inicial)
    navigate('/'); // Redireciona para a rota de login
    // Ou navigate('/'); se você quiser ir para a página inicial pública
  };
  const handleVerDados = () => {
    navigate('/ver-dados'); // Redireciona para a tela de ver dados
  };

  return (
    <div className="container-pos-login">
      <h1>Bem-vindo(a)</h1>
      <p>Esta é a sua nova tela de Dashboard/Conteúdo.</p>
      {/* Aqui você pode adicionar mais conteúdo da sua tela */}

      <button className="logout-button" onClick={handleLogout}>
        Sair da Conta
      </button>

      <button className="dados-button" onClick={handleVerDados}>
        Ver Dados
      </button>

      
    </div>
  );
}

export default TelaPosLogin;