import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; // Importe o useNavigate
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicialize o useNavigate
    const [loginError, setLoginError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Recupera os dados do localStorage
        const storedEmail = localStorage.getItem('email');
        const storedSenha = localStorage.getItem('senha');

        // Verifica se as credenciais coincidem
        if (email === storedEmail && password === storedSenha) {
            console.log('Login bem-sucedido!');
            // Redirecione para a página principal ou outra página após o login
            navigate('/home'); // Substitua '/home' pela rota desejada
        } else {
            console.log('Login falhou!');
            setLoginError('Credenciais inválidas.');
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu sua senha?</a>
                </div>
                <button type="submit">Login</button>
                <div className="signup-link">
                    <p>
                        Não tem uma conta? <Link to="/cadastro">cadastrar</Link>
                    </p>
                </div>
                {loginError && <p className="login-error">{loginError}</p>}
            </form>
        </div>
    );
};

export default Login;