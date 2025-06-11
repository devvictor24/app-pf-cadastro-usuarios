import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Recupera os dados salvos no localStorage
        const storedEmail = localStorage.getItem('email');
        const storedSenha = localStorage.getItem('senha');

        // Verifica se as credenciais estão corretas
        if (email === storedEmail && password === storedSenha) {
            console.log('Login bem-sucedido!');

            // Recuperar outros dados do usuário
            const usuario = {
                nome: localStorage.getItem('nome'),
                email: storedEmail,
                cpf: localStorage.getItem('cpf'),
                telefone: localStorage.getItem('telefone'),
                dataCadastro: localStorage.getItem('dataCadastro') || 'N/A'
            };

            // Salvar como JSON no localStorage para uso nas outras telas
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

            // Redireciona para a tela principal
            navigate('/home'); // Certifique-se que essa rota existe

        } else {
            setLoginError('E-mail ou senha inválidos.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>

                <div className="input-field">
                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" /> Lembre de mim
                    </label>
                    <a href="#"><Link to="/forgot-password">Esqueceu sua senha?</Link></a>
                </div>

                <button type="submit">Login</button>

                <div className="signup-link">
                    <p>
                        Não tem uma conta? <Link to="/cadastro">Cadastrar</Link>
                    </p>
                </div>

                {loginError && <p className="login-error">{loginError}</p>}
            </form>
        </div>
    );
};

export default Login;