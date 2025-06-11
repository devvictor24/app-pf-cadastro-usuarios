// src/Components/ForgotPassword/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css'; // Certifique-se de que o CSS também está atualizado

const ForgotPassword = () => {
    const [esqueceuSenha, setEsqueceuSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [message, setMessage] = useState(''); // Estado para mensagens
    const navigate = useNavigate();

    const handleResetPassword = (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Simula a verificação do email no localStorage
        const storedEmail = localStorage.getItem('email');

        if (!esqueceuSenha.trim()) {
            setMessage('Por favor, insira o e-mail cadastrado.');
            return;
        }

        if (esqueceuSenha.toLowerCase() !== storedEmail) {
            setMessage('E-mail não encontrado. Por favor, verifique.');
            return;
        }

        if (!novaSenha || !confirmarSenha) {
            setMessage('Preencha os campos de nova senha e confirmação.');
            return;
        }

        if (novaSenha.length < 6) {
            setMessage('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setMessage('As senhas não coincidem.');
            return;
        }

        // Simula a atualização da senha no localStorage
        localStorage.setItem('senha', novaSenha);
        setMessage('Senha redefinida com sucesso! Redirecionando...');

        // Redireciona para a tela de login após um pequeno atraso
        setTimeout(() => {
            navigate('/');
        }, 2000); // 2 segundos
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleResetPassword}>
                <h1>Redefinir Senha</h1>
                <p>Insira seu email e a nova senha para redefinir.</p>

                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Seu E-mail"
                        required
                        value={esqueceuSenha}
                        onChange={(e) => setEsqueceuSenha(e.target.value.toLowerCase())}
                    />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        required
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        required
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>

                <button type="submit">Redefinir Senha</button>
                
                {/* Exibe mensagem de erro ou sucesso */}
                {message && <p className={`message ${message.includes('sucesso') ? 'success' : ''}`}>{message}</p>}

                <div className="back-to-login">
                    <p>
                        Lembrou da senha? <Link to="/">Voltar para o Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;