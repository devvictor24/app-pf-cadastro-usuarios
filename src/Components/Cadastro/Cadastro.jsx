import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './Cadastro.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const [erros, setErros] = useState({});
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const navigate = useNavigate();

    const validarFormulario = () => {
        let novosErros = {};
        let formValido = true;

        if (!nome.trim()) {
            novosErros.nome = 'O nome é obrigatório.';
            formValido = false;
        }

        if (!email.trim()) {
            novosErros.email = 'O e-mail é obrigatório.';
            formValido = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            novosErros.email = 'Formato de e-mail inválido.';
            formValido = false;
        }

        if (!senha.trim()) {
            novosErros.senha = 'A senha é obrigatória.';
            formValido = false;
        } else if (senha.length < 6) {
            novosErros.senha = 'A senha deve ter no mínimo 6 caracteres.';
            formValido = false;
        }

        if (!confirmarSenha.trim()) {
            novosErros.confirmarSenha = 'Confirme a senha.';
            formValido = false;
        } else if (senha !== confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem.';
            formValido = false;
        }

        if (!telefone.trim()) {
            novosErros.telefone = 'O telefone é obrigatório.';
            formValido = false;
        } else if (telefone.replace(/[^0-9]/g, '').length < 10) {
            novosErros.telefone = 'Por favor, insira um telefone válido.';
            formValido = false;
        }

        setErros(novosErros);
        return formValido;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailFormatado = email.toLowerCase();
        setEmail(emailFormatado);

        if (validarFormulario()) {
            // Salva os dados no localStorage
            localStorage.setItem('nome', nome);
            localStorage.setItem('email', emailFormatado);
            localStorage.setItem('telefone', telefone);

            console.log('Dados salvos:', { nome, email: emailFormatado, telefone });

            setCadastroSucesso(true);

            // Limpa os campos
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
            setTelefone('');
            setErros({});

            // Redireciona após 3 segundos
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Volta uma página
    };

    return (
        <div className="cadastro-container">
            {cadastroSucesso ? (
                <div className="cadastro-sucesso-mensagem" role="alert">
                    Cadastro realizado com sucesso! Redirecionando...
                </div>
            ) : (
                <>
                    <h1>Cadastre-se</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={`input-field ${erros.nome ? 'error' : ''}`}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                onBlur={validarFormulario}
                                aria-invalid={erros.nome ? "true" : "false"}
                                aria-describedby="nome-error"
                            />
                            {erros.nome && <p id="nome-error" className="error-message">{erros.nome}</p>}
                        </div>

                        <div className={`input-field ${erros.email ? 'error' : ''}`}>
                            <input
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                onBlur={validarFormulario}
                                aria-invalid={erros.email ? "true" : "false"}
                                aria-describedby="email-error"
                            />
                            {erros.email && <p id="email-error" className="error-message">{erros.email}</p>}
                        </div>

                        <div className={`input-field ${erros.senha ? 'error' : ''}`}>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                onBlur={validarFormulario}
                                aria-invalid={erros.senha ? "true" : "false"}
                                aria-describedby="senha-error"
                            />
                            {erros.senha && <p id="senha-error" className="error-message">{erros.senha}</p>}
                        </div>

                        <div className={`input-field ${erros.confirmarSenha ? 'error' : ''}`}>
                            <input
                                type="password"
                                placeholder="Confirmar Senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                onBlur={validarFormulario}
                                aria-invalid={erros.confirmarSenha ? "true" : "false"}
                                aria-describedby="confirmarSenha-error"
                            />
                            {erros.confirmarSenha && <p id="confirmarSenha-error" className="error-message">{erros.confirmarSenha}</p>}
                        </div>

                        <div className={`input-field ${erros.telefone ? 'error' : ''}`}>
                            <InputMask
                                mask="(99) 99999-9999"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                onBlur={validarFormulario}
                                aria-invalid={erros.telefone ? "true" : "false"}
                                aria-describedby="telefone-error"
                            >
                                {(inputProps) => <input type="tel" {...inputProps} />}
                            </InputMask>
                            {erros.telefone && <p id="telefone-error" className="error-message">{erros.telefone}</p>}
                        </div>

                        <button type="submit">Cadastrar</button>
                        <button type="button" onClick={handleGoBack} className="btn-voltar">Voltar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Cadastro;