import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [senhaDiferente, setSenhaDiferente] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (senha !== confirmarSenha) {
            setSenhaDiferente(true);
            return;
        }
        setSenhaDiferente(false);

        // Simula o cadastro usando localStorage
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('senha', senha);

        console.log('Dados de Cadastro (localStorage):', { nome, email, senha });
        setCadastroSucesso(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div className="cadastro-container">
            {cadastroSucesso ? (
                <div className="cadastro-sucesso-mensagem">
                    Cadastro realizado com sucesso! Redirecionando...
                </div>
            ) : (
                <>
                    <h1>Cadastre-se</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Confirmar Senha" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        </div>
                        {senhaDiferente && <p className="senha-diferente-mensagem">As senhas não coincidem.</p>}
                        <button type="submit">Cadastrar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Cadastro;