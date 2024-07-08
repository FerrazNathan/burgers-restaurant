import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoginFormProps } from './LoginForm.types';

import * as S from './styles';

const LoginForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as LoginFormProps[];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      setMessage('Login realizado com sucesso!');
      setLoading(true);
        router.push('/');
    } else {
      setMessage('Email ou senha inválidos.');
    }
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as LoginFormProps[];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      setMessage('Usuário já existe.');
    } else {
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Conta criada com sucesso!');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoginMode) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('Você saiu do sistema.');
  };

  if (isLoggedIn) {
    return (
      <S.ContainerLoginForm>
        <h2>Você já está logado no sistema</h2>
        <S.ContainerButtonLogout>
          <button onClick={handleLogout}>Sair</button>
        </S.ContainerButtonLogout>
        {message && <p>{message}</p>}
      </S.ContainerLoginForm>
    );
  }

  return (
    <S.ContainerLoginForm>
      <h2>{isLoginMode ? 'Entrar' : 'Criar Conta'}</h2>
      <p>Faça o login para poder utilizar o sistema</p>
      <S.ContainerForm onSubmit={handleSubmit}>
        <S.ContainerEmailPassword>
          <span>Email:</span>
          <input 
            type="email" 
            value={email} 
            onChange={handleEmailChange}
            placeholder="E-mail de usuário" 
            required 
          />
        </S.ContainerEmailPassword>
        <S.ContainerEmailPassword>
          <span>Senha:</span>
          <input 
            type="password" 
            value={password} 
            placeholder="Insira a senha"
            onChange={handlePasswordChange} 
            required 
          />
        </S.ContainerEmailPassword>
        <S.ContainerButtonSubmit>
          <button type="submit">{isLoginMode ? 'Entrar' : 'Criar Conta'}</button>
        </S.ContainerButtonSubmit>
      </S.ContainerForm>
      <S.ContainerButtonLogin>
        <button onClick={handleSwitchMode}>
          {isLoginMode ? 'Criar uma conta' : 'Já tem uma conta? Entrar'}
        </button>
      </S.ContainerButtonLogin>
      {message && <p>{message}</p>}
      {loading && <p>Carregando...</p>}
    </S.ContainerLoginForm>
  );
};

export { LoginForm };
