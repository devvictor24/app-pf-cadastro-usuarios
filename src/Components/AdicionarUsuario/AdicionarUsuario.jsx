import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask'; // Importe o InputMask

const AdicionarUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState(''); // Estado para o telefone

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    // Cria um novo objeto de usuário
    const novoUsuario = {
      id: Date.now(), // Gera um ID único
      nome,
      email,
      telefone, // O telefone já virá formatado pela máscara
    };

    // Recupera usuários existentes ou cria uma nova lista
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Redireciona de volta para a tela "Ver Dados"
    navigate('/ver-dados');
  };

  return (
    <div className="form-page-container">
      <h2>Adicionar Novo Usuário</h2>
      <p>Preencha os dados abaixo para adicionar um novo usuário.</p>

      <form onSubmit={handleSubmit} className="form-login">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
        </div>

        {/* CÓDIGO DO TELEFONE COM MÁSCARA */}
        <div className="input-wrapper">
          <InputMask
            mask="(99) 99999-9999" // Máscara para telefone celular (XX) XXXXX-XXXX
            maskChar="_" // Caractere que será exibido onde o usuário ainda não digitou
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          >
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
        </div>
        {/* FIM CÓDIGO DO TELEFONE COM MÁSCARA */}

        <button type="submit" className="btn-submit">Adicionar</button>

        {/* Botão Voltar */}
        <button onClick={() => navigate('/ver-dados')} className="btn-voltar">
          Voltar
        </button>
      </form>
    </div>
  );
};

export default AdicionarUsuario;