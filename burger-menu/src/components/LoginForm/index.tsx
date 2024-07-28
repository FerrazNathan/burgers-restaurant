import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '../Loading';
import axios from 'axios';

import * as S from './styles';

const LoginForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const endpoint = 'https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json';

  const handleLogin = async () => {
    try {
      const response = await axios.get(endpoint);
      const users = response.data;
      const user = Object.keys(users).find(key => 
        users[key].email === email && users[key].password === password
      );
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify({ isLogged: true }));
        setMessage('Login realizado com sucesso!');
        setLoading(true);
        router.push('/');
        if(users[user].isAdmin) {
          sessionStorage.setItem('isAdmin', JSON.stringify({ isAdmin: true }));
        }
      } else {
        setMessage('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:');
      setMessage('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    } finally {
      setName('');
      setEmail('');
      setPassword('');
    }    
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.get(endpoint);
      const users = response.data;

      const userExists = Object.values(users).some((u: any) => u.email === email);

      if (userExists) {
        setMessage('Usuário já existe.');
      } else {
        const newUser = { email, password, isAdmin: false, name: name };
        await axios.post(endpoint, newUser);
        setMessage('Conta criada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao criar conta:');
      setMessage('Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
    } finally {
      setName('');
      setEmail('');
      setPassword('');
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
    <S.ContainerSection>
      {loading && <Loading description='Carregando ...' />}
      {!loading && (
        <S.ContainerLoginForm>
          <h2>{isLoginMode ? 'Entrar' : 'Criar Conta'}</h2>
          <p>Faça o login para poder utilizar o sistema</p>
          <S.ContainerForm onSubmit={handleSubmit}>
            {!isLoginMode && (
              <S.ContainerEmailPassword>
                <span>Nome:</span>
                <input 
                  type="text" 
                  value={name} 
                  onChange={handleNameChange}
                  placeholder="Nome de usuário" 
                  required 
                />
              </S.ContainerEmailPassword>
            )}
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
        </S.ContainerLoginForm>
      )}
    </S.ContainerSection>
  );
};

export { LoginForm };
